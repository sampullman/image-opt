import { WasmInitOptions } from './optimize-options'
import { optimizeImageWrap, optimizeInitWrap } from './optimize-wrap'
import {
  IOptimizeRequest,
  IOptimizeResult,
  optimizeError,
  WorkerPool,
} from './worker-pool'

let workerPool: WorkerPool | undefined
let workerPoolKey = ''

const getWorkerPool = (workerUrl: string, poolSize?: number): WorkerPool => {
  const size = poolSize && poolSize > 0 ? poolSize : navigator.hardwareConcurrency || 2
  const key = `${workerUrl}:${size}`
  // Reusing the pool keeps the workers (and their WASM instances) warm, but it
  // has to be rebuilt when the caller asks for a different worker or size.
  if (!workerPool || workerPoolKey !== key) {
    workerPool?.terminate()
    workerPool = new WorkerPool(workerUrl, size)
    workerPoolKey = key
  }
  return workerPool
}

// Optimizes images using web workers, falling back to the calling thread.
// One image failing does not fail the rest; each result carries its own error.
export const optimizeImages = async (
  images: IOptimizeRequest[],
  workerUrl: string | undefined,
  wasmInit: WasmInitOptions,
  poolSize?: number,
): Promise<IOptimizeResult[]> => {
  if (workerUrl && self.Worker) {
    return getWorkerPool(workerUrl, poolSize).optimize(images, wasmInit)
  }
  return Promise.all(
    images.map(async ({ file, optimizer, options }): Promise<IOptimizeResult> => {
      try {
        await optimizeInitWrap({ ...wasmInit, optimizer })
        return { file, data: await optimizeImageWrap(file, optimizer, options) }
      } catch (e) {
        return { file, error: optimizeError(e) }
      }
    }),
  )
}
