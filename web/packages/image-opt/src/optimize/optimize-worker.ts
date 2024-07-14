import { WorkerCommand, WorkerFileData, WorkerResultType } from './worker-enum'
import { IOxipngOptions, initOxipng, optimizeOxipng } from './oxipng'
import { AssetContentType } from '../util'
import { IMozjpegOptions, initMozjpeg, optimizeMozjpeg } from './mozjpeg'

self.onmessage = async (e: MessageEvent<WorkerCommand>) => {
  const { file, init, options } = (e.data ?? {}) as WorkerCommand
  if (!file) {
    return
  }
  const { buffer, data } = file
  switch (init.assetType) {
    case AssetContentType.Png:
      try {
        if (!buffer) {
          self.postMessage({ type: WorkerResultType.Error, output: 'Invalid PNG data' })
          return
        }
        await initOxipng(init.oxipngWasm)
        const opts = options as IOxipngOptions | undefined
        const result = optimizeOxipng(buffer, opts)
        self.postMessage({ type: WorkerResultType.Complete, output: result })
      } catch (e) {
        self.postMessage({ type: WorkerResultType.Error, output: e })
      }
      break
    case AssetContentType.Jpeg:
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
    default:
      console.log('Error: unknown worker command', e.data)
      self.postMessage({ type: WorkerResultType.Error, output: 'Unknown command' })
  }
}

export {}
