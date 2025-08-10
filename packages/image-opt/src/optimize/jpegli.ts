import { JpegliModule, encode, init } from '../../../../optimizers/jpegli/jpegli'
import { IOptimizerJpegOptions } from '../store'
import { urlFromString } from '../util'

let jpegli: JpegliModule

export const initJpegli = async (jpegliWasm: string | undefined) => {
  if (!jpegli) {
    jpegli = await init(urlFromString(jpegliWasm))
  }
}

export const optimizeJpegli = (
  image: ImageData,
  options: IOptimizerJpegOptions,
) => {
  const array = new Uint8Array(image.data)
  const result = encode(
    array,
    image.width,
    image.height,
    2, // colorspace
    options.quality,
    options.progressiveLevel,
    options.optimizeCoding,
    options.adaptiveQuantization,
    options.standardQuantTables,
    options.fancyDownsampling,
    options.dctMethod,
  )
  return result
}
