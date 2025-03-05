import { JpegliModule, encode, init } from '../../../../../jpegli/jpegli'
import { urlFromString } from '../util'

export interface IJpegliOptions {
  colorspace: number
  quality: number
  progressiveLevel?: number
  optimizeCoding: boolean
  adaptiveQuantization: boolean
  standardQuantTables: boolean
  fancyDownsampling: boolean
  dctMethod: JpegliDctMethod
}

export enum JpegliDctMethod {
  DCTISlow = 0, // DCTISlow is slow but accurate integer algorithm
  DCTIFast = 1, // Faster less accurate integer method

  DCTFloat = 2, // DCTFloat is floating-point: accurate, fast on fast HW
}

let jpegli: JpegliModule

export const initJpegli = async (jpegliWasm: string | undefined) => {
  if (!jpegli) {
    jpegli = await init(urlFromString(jpegliWasm))
  }
}

const bToI = (b: boolean | undefined, defaultVal: boolean): number => {
  return b ?? defaultVal ? 1 : 0
}

export const optimizeJpegli = (image: ImageData, options?: IJpegliOptions) => {
  const array = new Uint8Array(image.data)
  console.log('OPT JPEGLI')
  const result = encode(
    array,
    image.width,
    image.height,
    options?.colorspace ?? 2,
    options?.quality ?? 80,
    options?.progressiveLevel ?? 2,
    bToI(options?.optimizeCoding, true),
    bToI(options?.adaptiveQuantization, true),
    bToI(options?.standardQuantTables, false),
    bToI(options?.fancyDownsampling, false),
    options?.dctMethod ?? JpegliDctMethod.DCTISlow,
  )
  return result
}
