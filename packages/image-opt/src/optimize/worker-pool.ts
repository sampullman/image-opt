import { OptimizerType, WasmInitOptions } from './optimize-options'
import { IOptimizeRequest, IOptimizeResult, optimizeError } from './optimize-request'
import { WorkerCommand, WorkerResult, WorkerResultType } from './worker-enum'

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
  request: IOptimizeRequest
  wasmInit: WasmInitOptions
  resolve: (result: IOptimizeResult) => void
}

export class WorkerPool {
  private workers: Worker[] = []
  private taskQueue: Task[] = []
  private idleWorkers: Worker[] = []
  private activeTasks: Map<Worker, Task> = new Map()
  private workerUrl: string
  private poolSize: number

  constructor(workerUrl: string, poolSize: number) {
    this.workerUrl = workerUrl
    this.poolSize = Math.max(1, poolSize)
  }

  public optimize(
    images: IOptimizeRequest[],
    wasmInit: WasmInitOptions,
  ): Promise<IOptimizeResult[]> {
    return Promise.all(images.map((image) => this.queueRequest(image, wasmInit)))
  }

  public terminate() {
    for (const worker of this.workers) {
      worker.terminate()
    }
    this.workers = []
    this.idleWorkers = []
    // Nothing is left to answer these
    const abandoned = [...this.activeTasks.values(), ...this.taskQueue]
    this.activeTasks.clear()
    this.taskQueue = []
    for (const task of abandoned) {
      task.resolve({ input: task.request.input, error: 'Optimizer was terminated' })
    }
  }

  private queueRequest(
    request: IOptimizeRequest,
    wasmInit: WasmInitOptions,
  ): Promise<IOptimizeResult> {
    return new Promise((resolve) => {
      this.taskQueue.push({ request, wasmInit, resolve })
      this.dispatch()
    })
  }

  /** Starts a worker on demand, up to the pool size. */
  private spawn(): Worker | undefined {
    if (this.workers.length >= this.poolSize) {
      return undefined
    }
    const worker = workerHack(this.workerUrl)
    worker.onmessage = this.onWorkerMessage.bind(this, worker)
    worker.onerror = (event) => this.retireWorker(worker, event.message || 'Worker error')
    this.workers.push(worker)
    return worker
  }

  private dispatch() {
    while (this.taskQueue.length) {
      const worker = this.idleWorkers.shift() ?? this.spawn()
      if (!worker) {
        // All busy; the next to finish takes it
        return
      }
      const task = this.taskQueue.shift()
      if (!task) {
        this.idleWorkers.unshift(worker)
        return
      }
      this.activeTasks.set(worker, task)
      this.send(worker, task)
    }
  }

  private async send(worker: Worker, task: Task) {
    const { request, wasmInit } = task
    try {
      // Only oxipng reads the encoded file, so avoid the copy otherwise
      const buffer =
        request.optimizer === OptimizerType.Oxipng
          ? await request.input.file?.arrayBuffer()
          : undefined
      const command: WorkerCommand = {
        init: wasmInit,
        file: { buffer, data: request.input.data },
        optimizer: request.optimizer,
        options: request.options,
      }
      // An owned copy, so transfer rather than clone
      worker.postMessage(command, buffer ? [buffer] : [])
    } catch (e) {
      this.failTask(worker, e)
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
          input: workerTask.request.input,
          data: event.data.output as Uint8Array,
        })
        this.releaseWorker(worker)
        break
      default:
        this.failTask(worker, event.data.output)
    }
  }

  /** Fails a worker's task, and puts the worker back to work. */
  private failTask(worker: Worker, reason: unknown) {
    const workerTask = this.activeTasks.get(worker)
    workerTask?.resolve({
      input: workerTask.request.input,
      error: optimizeError(reason),
    })
    this.releaseWorker(worker)
  }

  /**
   * Drops a worker whose script failed to load. It never runs its message
   * handler, so a task given to it would hang. A later task spawns a fresh one.
   */
  private retireWorker(worker: Worker, reason: unknown) {
    this.workers = this.workers.filter((w) => w !== worker)
    this.idleWorkers = this.idleWorkers.filter((w) => w !== worker)
    const workerTask = this.activeTasks.get(worker)
    this.activeTasks.delete(worker)
    worker.terminate()
    workerTask?.resolve({
      input: workerTask.request.input,
      error: optimizeError(reason),
    })
    this.dispatch()
  }

  private releaseWorker(worker: Worker) {
    this.activeTasks.delete(worker)
    if (this.workers.includes(worker)) {
      this.idleWorkers.push(worker)
    }
    this.dispatch()
  }
}
