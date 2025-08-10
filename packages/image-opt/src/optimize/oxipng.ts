import init, { optimize, InitOutput } from '../../../../optimizers/oxipng/pkg/image_opt'
import { IOptimizerPngOptions } from '../store'
import { urlFromString } from '../util'

let oxipng: InitOutput

export const initOxipng = async (oxipngWasm: string | undefined) => {
  if (!oxipng) {
    oxipng = await init(urlFromString(oxipngWasm))
  }
}

export const optimizeOxipng = (
  data: Uint8Array,
  options?: IOptimizerPngOptions,
) => {
  const result = optimize(
    data,
    options?.level ?? 3,
    options?.interlace ?? false,
    options?.strip ?? true,
  )
  return result
}
