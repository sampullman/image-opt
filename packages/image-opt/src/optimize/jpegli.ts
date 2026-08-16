import { JpegliModule, encode, init } from '../wasm/jpegli/jpegli'
import { urlFromString } from '../util'

export interface IJpegliOptions {
  quality: number
  progressiveLevel: number
  optimizeCoding: number
  adaptiveQuantization: number
  standardQuantTables: number
  fancyDownsampling: number
  dctMethod: number
}

export const defaultJpegliOptions: IJpegliOptions = {
  quality: 75,
  progressiveLevel: 2,
  optimizeCoding: 1,
  adaptiveQuantization: 1,
  standardQuantTables: 0,
  fancyDownsampling: 1,
  dctMethod: 0,
}

const YCbCr = 2

let jpegli: JpegliModule

export const initJpegli = async (jpegliWasm: string | undefined) => {
  if (!jpegli) {
    const url = urlFromString(jpegliWasm)
    if (!url) {
      throw new Error('A jpegli WASM URL is required')
    }
    jpegli = await init(url)
  }
}

export const optimizeJpegli = (image: ImageData, options: IJpegliOptions): Uint8Array => {
  const array = new Uint8Array(image.data)
  return encode(
    array,
    image.width,
    image.height,
    YCbCr,
    options.quality,
    options.progressiveLevel,
    options.optimizeCoding,
    options.adaptiveQuantization,
    options.standardQuantTables,
    options.fancyDownsampling,
    options.dctMethod,
  )
}
