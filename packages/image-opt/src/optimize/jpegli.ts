import {
  IJpegliEncodeOptions,
  JpegliChroma,
  JpegliColorSpace,
  JpegliModule,
  encode,
  init,
} from '../wasm/jpegli/jpegli'
import { urlFromString } from '../util'

export { JpegliChroma } from '../wasm/jpegli/jpegli'

export type IJpegliOptions = IJpegliEncodeOptions

export const defaultJpegliOptions: IJpegliOptions = {
  quality: 75,
  chromaSubsampling: JpegliChroma.YCbCr420,
  progressiveLevel: 2,
  optimizeCoding: 1,
  adaptiveQuantization: 1,
  standardQuantTables: 0,
  fancyDownsampling: 1,
  dctMethod: 0,
}

let jpegliInit: Promise<JpegliModule> | undefined

// Caches the in-flight promise, so a concurrent batch shares one
// instantiation. Failures are not cached, so a later attempt can retry.
export const initJpegli = (jpegliWasm: string | undefined): Promise<JpegliModule> => {
  if (!jpegliInit) {
    const url = urlFromString(jpegliWasm)
    if (!url) {
      return Promise.reject(new Error('A jpegli WASM URL is required'))
    }
    jpegliInit = init(url).catch((e) => {
      jpegliInit = undefined
      throw e
    })
  }
  return jpegliInit
}

// `ImageData` is RGBA, which the encoder converts to YCbCr itself. Its bytes
// are handed over as they are: the copy into WASM memory is the only one made.
export const optimizeJpegli = (image: ImageData, options: IJpegliOptions): Uint8Array => {
  return encode(image.data, image.width, image.height, JpegliColorSpace.Rgba, options)
}
