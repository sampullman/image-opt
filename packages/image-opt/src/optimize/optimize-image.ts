import { absoluteUrl } from '../util'
import { WasmInitOptions } from './optimize-options'
import { IOptimizeRequest, IOptimizeResult, optimizeError } from './optimize-request'
import { optimizeImageWrap, optimizeInitWrap } from './optimize-wrap'
import { WorkerPool } from './worker-pool'

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

const optionalUrl = (url: string | undefined): string | undefined =>
  url ? absoluteUrl(url) : undefined

// See `absoluteUrl`
const resolveWasmUrls = (wasmInit: WasmInitOptions): WasmInitOptions => ({
  oxipngWasm: optionalUrl(wasmInit.oxipngWasm),
  mozjpegWasm: optionalUrl(wasmInit.mozjpegWasm),
  jpegliWasm: optionalUrl(wasmInit.jpegliWasm),
})

// Optimizes images using web workers, falling back to the calling thread.
// One image failing does not fail the rest; results come back in request order.
export const optimizeImages = async (
  images: IOptimizeRequest[],
  workerUrl: string | undefined,
  wasmInit: WasmInitOptions,
  poolSize?: number,
): Promise<IOptimizeResult[]> => {
  const wasm = resolveWasmUrls(wasmInit)
  if (workerUrl && self.Worker) {
    return getWorkerPool(absoluteUrl(workerUrl), poolSize).optimize(images, wasm)
  }
  return Promise.all(
    images.map(async (request): Promise<IOptimizeResult> => {
      const { input } = request
      try {
        await optimizeInitWrap(request.optimizer, wasm)
        return { input, data: await optimizeImageWrap(input, request) }
      } catch (e) {
        return { input, error: optimizeError(e) }
      }
    }),
  )
}
