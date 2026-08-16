import init, { MozJPEGModule, EncodeOptions } from '../wasm/mozjpeg/mozjpeg_enc'
import { MozJpegColorSpace } from '../wasm/mozjpeg/mozjpeg-color-space'
import { urlFromString } from '../util'

export type IMozjpegOptions = EncodeOptions

export const defaultMozjpegOptions: EncodeOptions = {
  quality: 75,
  baseline: false,
  arithmetic: false,
  progressive: true,
  optimize_coding: true,
  smoothing: 0,
  color_space: MozJpegColorSpace.YCbCr,
  quant_table: 3,
  trellis_multipass: false,
  trellis_opt_zero: false,
  trellis_opt_table: false,
  trellis_loops: 1,
  auto_subsample: true,
  chroma_subsample: 2,
  separate_chroma_quality: false,
  chroma_quality: 75,
}

let mozjpeg: MozJPEGModule | undefined
let mozjpegInit: Promise<MozJPEGModule> | undefined

// As `initJpegli`
export const initMozjpeg = (mozjpegWasm: string | undefined): Promise<MozJPEGModule> => {
  if (!mozjpegInit) {
    mozjpegInit = init({}, urlFromString(mozjpegWasm))
      .then((module) => {
        mozjpeg = module
        return module
      })
      .catch((e) => {
        mozjpegInit = undefined
        throw e
      })
  }
  return mozjpegInit
}

export const optimizeMozjpeg = (image: ImageData, options: IMozjpegOptions) => {
  if (!mozjpeg) {
    throw new Error('Mozjpeg has not been initialized')
  }
  const result = mozjpeg.encode(image.data, image.width, image.height, options)
  return result
}
