import { IJpegliOptions } from './jpegli'
import { IMozjpegOptions } from './mozjpeg'
import { OptimizerType } from './optimize-options'
import { IOxipngOptions } from './oxipng'

/** Oxipng reads `file`, the JPEG encoders read `data`. Only one is needed. */
export interface IOptimizeInput {
  file?: Blob
  data?: ImageData
}

/** Options keyed by the optimizer that reads them. */
export interface IOptimizerOptions {
  [OptimizerType.Oxipng]: IOxipngOptions
  [OptimizerType.Jpegli]: IJpegliOptions
  [OptimizerType.Mozjpeg]: IMozjpegOptions
}

/** Any one optimizer's options. */
export type IOptimizerOption = IOptimizerOptions[OptimizerType]

/**
 * Adds an optimizer and its options to `T`. A union, so options are checked
 * against the optimizer named beside them; anything omitted keeps the default.
 */
export type WithOptimizer<T> = {
  [K in OptimizerType]: T & {
    optimizer: K
    options?: Partial<IOptimizerOptions[K]>
  }
}[OptimizerType]

/** An optimizer and its options, with no image attached. */
export type IOptimizeSpec = WithOptimizer<unknown>

/** One image, and how to optimize it. */
export type IOptimizeRequest = WithOptimizer<{ input: IOptimizeInput }>

/** One image's outcome: `data` or `error`. Returned in request order. */
export interface IOptimizeResult {
  input: IOptimizeInput
  data?: Uint8Array
  error?: string
}

export const optimizeError = (e: unknown): string => {
  if (e instanceof Error) {
    return e.message
  }
  return typeof e === 'string' && e ? e : 'Failed to optimize'
}
