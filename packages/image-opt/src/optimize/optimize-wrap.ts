import { AssetContentType, ValidatedFile } from '../util'
import {
  IJpegliOptions,
  defaultJpegliOptions,
  initJpegli,
  optimizeJpegli,
} from './jpegli'
import {
  IMozjpegOptions,
  defaultMozjpegOptions,
  initMozjpeg,
  optimizeMozjpeg,
} from './mozjpeg'
import { OptimizerType, OptimizeInitOptions } from './optimize-options'
import {
  IOxipngOptions,
  defaultOxipngOptions,
  initOxipng,
  optimizeOxipng,
} from './oxipng'

export const optimizeInitWrap = (options: OptimizeInitOptions) => {
  const { jpegliWasm, mozjpegWasm, oxipngWasm } = options
  switch (options.optimizer) {
    case OptimizerType.Oxipng:
      return initOxipng(oxipngWasm)
    case OptimizerType.Jpegli:
      return initJpegli(jpegliWasm)
    case OptimizerType.Mozjpeg:
      return initMozjpeg(mozjpegWasm)
  }
}

// What an optimizer needs from an image. Oxipng rewrites the encoded PNG, while
// the JPEG encoders work from decoded pixels.
export interface IEncodeInput {
  buffer?: ArrayBuffer
  data?: ImageData
}

// The single place an optimizer is chosen, shared by the worker and the
// in-thread fallback so the two cannot drift apart.
export const encodeImage = (
  optimizer: OptimizerType,
  input: IEncodeInput,
  options: Record<string, unknown>,
): Uint8Array => {
  switch (optimizer) {
    case OptimizerType.Oxipng:
      if (!input.buffer) {
        throw new Error('Optimizing a PNG requires the encoded file')
      }
      return optimizeOxipng(new Uint8Array(input.buffer), options as IOxipngOptions)
    case OptimizerType.Jpegli:
      if (!input.data) {
        throw new Error('Optimizing a JPEG requires decoded image data')
      }
      return optimizeJpegli(input.data, options as unknown as IJpegliOptions)
    case OptimizerType.Mozjpeg:
      if (!input.data) {
        throw new Error('Optimizing a JPEG requires decoded image data')
      }
      return optimizeMozjpeg(input.data, options as unknown as IMozjpegOptions)
    default:
      throw new Error(`Unknown optimizer: ${optimizer}`)
  }
}

export const optimizeImageWrap = async (
  validFile: ValidatedFile,
  optimizer: OptimizerType,
  options: Record<string, unknown>,
): Promise<Uint8Array> => {
  const { data, file } = validFile
  // Only oxipng reads the encoded file, so avoid the copy otherwise
  const buffer = optimizer === OptimizerType.Oxipng ? await file.arrayBuffer() : undefined
  return encodeImage(optimizer, { buffer, data }, options)
}

// Every option an optimizer understands, so a caller can supply as few or as
// many as it likes.
export const getDefaultOptions = (optimizer: OptimizerType): Record<string, unknown> => {
  switch (optimizer) {
    case OptimizerType.Oxipng:
      return { ...defaultOxipngOptions }
    case OptimizerType.Jpegli:
      return { ...defaultJpegliOptions }
    case OptimizerType.Mozjpeg:
      return { ...defaultMozjpegOptions }
  }
}

// The optimizer that produces `assetType`, honouring the JPEG encoder choice.
export const optimizerForType = (
  assetType: AssetContentType,
  jpegOptimizer: OptimizerType,
): OptimizerType => {
  return assetType === AssetContentType.Jpeg ? jpegOptimizer : OptimizerType.Oxipng
}
