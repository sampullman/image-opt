import { WasmInitOptions } from './optimize-options'
import { optimizeImageWrap } from './optimize-wrap'
import { IOptimizeRequest, IOptimizeResult, WorkerPool } from './worker-pool'

let workerPool: WorkerPool | undefined

// Optimizes an image using web workers, if available
export const optimizeImages = async (
  images: IOptimizeRequest[],
  workerUrl: string | undefined,
  wasmInit: WasmInitOptions,
  poolSize?: number,
): Promise<IOptimizeResult[]> => {
  if (workerUrl && window.Worker) {
    if (!workerPool) {
      const size =
        poolSize && poolSize > 0 ? poolSize : navigator.hardwareConcurrency || 2
      workerPool = new WorkerPool(workerUrl, size)
    }
    return workerPool.optimize(images, wasmInit)
  } else {
    return Promise.all(
      images.map(async ({ file, options }) => {
        const data = await optimizeImageWrap(file, file.type, options)
        return { data, file }
      }),
    )
  }
}
