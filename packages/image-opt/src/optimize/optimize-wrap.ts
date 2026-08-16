import { AssetContentType } from '../util'
import { defaultJpegliOptions, initJpegli, optimizeJpegli } from './jpegli'
import { defaultMozjpegOptions, initMozjpeg, optimizeMozjpeg } from './mozjpeg'
import { OptimizerType, WasmInitOptions } from './optimize-options'
import {
  IOptimizeInput,
  IOptimizerOption,
  IOptimizerOptions,
  IOptimizeSpec,
} from './optimize-request'
import { defaultOxipngOptions, initOxipng, optimizeOxipng } from './oxipng'

export const optimizeInitWrap = (
  optimizer: OptimizerType,
  wasm: WasmInitOptions,
): Promise<unknown> => {
  switch (optimizer) {
    case OptimizerType.Oxipng:
      return initOxipng(wasm.oxipngWasm)
    case OptimizerType.Jpegli:
      return initJpegli(wasm.jpegliWasm)
    case OptimizerType.Mozjpeg:
      return initMozjpeg(wasm.mozjpegWasm)
  }
}

/** `IOptimizeInput` with the encoded bytes already read. */
export interface IEncodeInput {
  buffer?: ArrayBuffer
  data?: ImageData
}

const DEFAULT_OPTIONS: IOptimizerOptions = {
  [OptimizerType.Oxipng]: defaultOxipngOptions,
  [OptimizerType.Jpegli]: defaultJpegliOptions,
  [OptimizerType.Mozjpeg]: defaultMozjpegOptions,
}

// Chooses the optimizer for both the worker and the in-thread fallback, and
// fills in the encoder's defaults under the caller's options.
export const encodeImage = (spec: IOptimizeSpec, input: IEncodeInput): Uint8Array => {
  switch (spec.optimizer) {
    case OptimizerType.Oxipng:
      if (!input.buffer) {
        throw new Error('Optimizing a PNG requires the encoded file')
      }
      return optimizeOxipng(new Uint8Array(input.buffer), {
        ...defaultOxipngOptions,
        ...spec.options,
      })
    case OptimizerType.Jpegli:
      if (!input.data) {
        throw new Error('Optimizing a JPEG requires decoded image data')
      }
      return optimizeJpegli(input.data, { ...defaultJpegliOptions, ...spec.options })
    case OptimizerType.Mozjpeg:
      if (!input.data) {
        throw new Error('Optimizing a JPEG requires decoded image data')
      }
      return optimizeMozjpeg(input.data, { ...defaultMozjpegOptions, ...spec.options })
    default:
      // Only reachable from JS
      throw new Error(`Unknown optimizer: ${JSON.stringify(spec)}`)
  }
}

export const optimizeImageWrap = async (
  input: IOptimizeInput,
  spec: IOptimizeSpec,
): Promise<Uint8Array> => {
  // Only oxipng reads the encoded file, so avoid the copy otherwise
  const buffer =
    spec.optimizer === OptimizerType.Oxipng ? await input.file?.arrayBuffer() : undefined
  return encodeImage(spec, { buffer, data: input.data })
}

// For a UI that displays or edits them; a request need not pass them back.
export const getDefaultOptions = (optimizer: OptimizerType): IOptimizerOption => {
  return { ...DEFAULT_OPTIONS[optimizer] }
}

// The optimizer that produces `assetType`, honouring the JPEG encoder choice.
export const optimizerForType = (
  assetType: AssetContentType,
  jpegOptimizer: OptimizerType,
): OptimizerType => {
  return assetType === AssetContentType.Jpeg ? jpegOptimizer : OptimizerType.Oxipng
}
