import init, {
  MozJPEGModule,
  EncodeOptions,
} from '../../../../../mozjpeg/enc/mozjpeg_enc'
import { MozJpegColorSpace } from '../../../../../mozjpeg/enc/mozjpeg-color-space'
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

let mozjpeg: MozJPEGModule

export const initMozjpeg = async (mozjpegWasm: string | undefined) => {
  if (!mozjpeg) {
    mozjpeg = await init({}, urlFromString(mozjpegWasm))
  }
}

export const optimizeMozjpeg = (image: ImageData, options: IMozjpegOptions) => {
  console.log('OPT MOZ')
  const result = mozjpeg.encode(image.data, image.width, image.height, options)
  return result
}
