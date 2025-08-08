import { ValidatedFile } from '../util'
import { Optimizer, WasmInitOptions } from './optimize-options'
import { WorkerResult, WorkerResultType, WorkerCommand } from './worker-enum'

export interface IOptimizeRequest {
  file: ValidatedFile
  optimizer: Optimizer
  options: Record<string, unknown>
}

export interface IOptimizeResult {
  data: Uint8Array | undefined
  file: ValidatedFile
}

// Avoids CORS issue, see https://github.com/vitejs/vite/issues/13680
const workerHack = (url: string) => {
  const js = `import ${JSON.stringify(url)}`
  const blob = new Blob([js], { type: 'application/javascript' })

  const objURL = URL.createObjectURL(blob)
  const worker = new Worker(objURL, { type: 'module', name: 'optimize-worker' })
  worker.addEventListener('error', (_e) => {
    URL.revokeObjectURL(objURL)
  })
  return worker
}

interface Task {
  file: ValidatedFile
  wasmInit: WasmInitOptions
  optimizer: Optimizer
  options: Record<string, unknown>
  resolve: (result: IOptimizeResult) => void
  reject: (error: any) => void
}

export class WorkerPool {
  private workers: Worker[] = []
  private taskQueue: Task[] = []
  private idleWorkers: Worker[] = []
  private activeTasks: Map<Worker, Task> = new Map()
  private workerUrl: string

  constructor(workerUrl: string, poolSize: number) {
    this.workerUrl = workerUrl
    for (let i = 0; i < poolSize; i++) {
      const worker = workerHack(this.workerUrl)
      worker.onmessage = this.onWorkerMessage.bind(this, worker)
      worker.onerror = this.onWorkerError.bind(this, worker)
      this.workers.push(worker)
      this.idleWorkers.push(worker)
    }
  }

  private onWorkerMessage(worker: Worker, event: MessageEvent<WorkerResult>) {
    const workerTask = this.activeTasks.get(worker)
    if (!workerTask) {
      return
    }

    switch (event.data.type) {
      case WorkerResultType.Complete:
        workerTask.resolve({
          data: event.data.output as Uint8Array,
          file: workerTask.file,
        })
        break
      default:
        workerTask.reject(event.data.output || 'Worker failed to optimize')
    }
    this.activeTasks.delete(worker)
    this.idleWorkers.push(worker)
    this.dispatch()
  }

  private onWorkerError(worker: Worker, event: ErrorEvent) {
    const workerTask = this.activeTasks.get(worker)
    if (workerTask) {
      workerTask.reject(event.message || 'Worker error')
      this.activeTasks.delete(worker)
    }
    this.idleWorkers.push(worker)
    this.dispatch()
  }

  private queueRequest(
    image: IOptimizeRequest,
    wasmInit: WasmInitOptions,
  ): Promise<IOptimizeResult> {
    const { file, optimizer, options } = image
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ file, wasmInit, optimizer, options, resolve, reject })
      this.dispatch()
    })
  }

  public optimize(
    images: IOptimizeRequest[],
    wasmInit: WasmInitOptions,
  ): Promise<IOptimizeResult[]> {
    return Promise.all(images.map((image) => this.queueRequest(image, wasmInit)))
  }

  private async dispatch() {
    while (this.idleWorkers.length && this.taskQueue.length) {
      const worker = this.idleWorkers.shift()
      const task = this.taskQueue.shift()

      if (worker && task) {
        this.activeTasks.set(worker, task)
        const { file, wasmInit, optimizer, options } = task
        file.file.arrayBuffer().then((buffer) => {
          console.log('START', file.file.name)
          const command: WorkerCommand = {
            init: {
              ...wasmInit,
              assetType: file.type,
              optimizer,
            },
            file: {
              name: file.file.name,
              buffer,
              data: file.data,
            },
            options: { ...options },
          }
          worker.postMessage(command)
        })
      }
    }
  }

  public terminate() {
    for (const worker of this.workers) {
      worker.terminate()
    }
  }
}
