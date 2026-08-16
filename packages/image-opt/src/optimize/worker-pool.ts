import { ValidatedFile } from '../util'
import { OptimizerType, WasmInitOptions } from './optimize-options'
import { WorkerResult, WorkerResultType, WorkerCommand } from './worker-enum'

export interface IOptimizeRequest {
  file: ValidatedFile
  optimizer: OptimizerType
  options: Record<string, unknown>
}

// One image's outcome: either `data` or `error` is set. A failed image does not
// fail its batch, so the caller can report it next to the ones that succeeded.
export interface IOptimizeResult {
  file: ValidatedFile
  data?: Uint8Array
  error?: string
}

export const optimizeError = (e: unknown): string => {
  if (e instanceof Error) {
    return e.message
  }
  return typeof e === 'string' && e ? e : 'Failed to optimize'
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
  optimizer: OptimizerType
  options: Record<string, unknown>
  resolve: (result: IOptimizeResult) => void
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
      worker.onerror = (event) => this.failTask(worker, event.message || 'Worker error')
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
          file: workerTask.file,
          data: event.data.output as Uint8Array,
        })
        this.releaseWorker(worker)
        break
      default:
        this.failTask(worker, event.data.output)
    }
  }

  private failTask(worker: Worker, reason: unknown) {
    const workerTask = this.activeTasks.get(worker)
    workerTask?.resolve({ file: workerTask.file, error: optimizeError(reason) })
    this.releaseWorker(worker)
  }

  private releaseWorker(worker: Worker) {
    this.activeTasks.delete(worker)
    this.idleWorkers.push(worker)
    this.dispatch()
  }

  private queueRequest(
    image: IOptimizeRequest,
    wasmInit: WasmInitOptions,
  ): Promise<IOptimizeResult> {
    const { file, optimizer, options } = image
    return new Promise((resolve) => {
      this.taskQueue.push({ file, wasmInit, optimizer, options, resolve })
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
        file.file
          .arrayBuffer()
          .then((buffer) => {
            const command: WorkerCommand = {
              init: { ...wasmInit, optimizer },
              file: {
                name: file.file.name,
                buffer,
                data: file.data,
              },
              options: { ...options },
            }
            worker.postMessage(command)
          })
          .catch((e) => this.failTask(worker, e))
      }
    }
  }

  public terminate() {
    for (const worker of this.workers) {
      worker.terminate()
    }
  }
}
