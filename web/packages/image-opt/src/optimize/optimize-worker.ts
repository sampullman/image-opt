import { WorkerCommand, WorkerResultType } from './worker-enum'
import { IOxipngOptions, initOxipng, optimizeOxipng } from './oxipng'
import { IMozjpegOptions, initMozjpeg, optimizeMozjpeg } from './mozjpeg'
import { IJpegliOptions, initJpegli, optimizeJpegli } from './jpegli'
import { Optimizer } from './optimize-options'

self.onmessage = async (e: MessageEvent<WorkerCommand>) => {
  const { file, init, options } = (e.data ?? {}) as WorkerCommand
  if (!file) {
    return
  }
  const { buffer, data } = file
  switch (init.optimizer) {
    case Optimizer.Oxipng:
      try {
        if (!buffer) {
          self.postMessage({ type: WorkerResultType.Error, output: 'Invalid PNG data' })
          return
        }
        await initOxipng(init.oxipngWasm)
        const opts = options as IOxipngOptions | undefined
        const result = optimizeOxipng(new Uint8Array(buffer), opts)
        self.postMessage({ type: WorkerResultType.Complete, output: result })
      } catch (e) {
        self.postMessage({ type: WorkerResultType.Error, output: e })
      }
      break
    case Optimizer.Mozjpeg:
      try {
        if (!data) {
          self.postMessage({ type: WorkerResultType.Error, output: 'Invalid JPG data' })
          return
        }
        await initMozjpeg(init.mozjpegWasm)
        const opts = options as IMozjpegOptions
        const result = optimizeMozjpeg(data, opts)
        self.postMessage({ type: WorkerResultType.Complete, output: result })
      } catch (e) {
        self.postMessage({ type: WorkerResultType.Error, output: e })
      }
      break
    case Optimizer.Jpegli:
      try {
        if (!data) {
          self.postMessage({ type: WorkerResultType.Error, output: 'Invalid PNG data' })
          return
        }
        await initJpegli(init.jpegliWasm)
        const opts = options as IJpegliOptions | undefined
        const result = optimizeJpegli(data, opts)
        self.postMessage({ type: WorkerResultType.Complete, output: result })
      } catch (e) {
        self.postMessage({ type: WorkerResultType.Error, output: e })
      }
      break
    default:
      console.log('Error: unknown worker command', e.data)
      self.postMessage({ type: WorkerResultType.Error, output: 'Unknown command' })
  }
}

export {}
