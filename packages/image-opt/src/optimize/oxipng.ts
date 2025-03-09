import init, { optimize, InitOutput } from '../../../../optimizers/oxipng/pkg/image_opt'
import { urlFromString } from '../util'

export interface IOxipngOptions {
  level?: number
  interlace?: boolean
}

let oxipng: InitOutput

export const initOxipng = async (oxipngWasm: string | undefined) => {
  if (!oxipng) {
    oxipng = await init(urlFromString(oxipngWasm))
  }
}

export const optimizeOxipng = (data: Uint8Array, options?: IOxipngOptions) => {
  const result = optimize(data, options?.level ?? 3, options?.interlace ?? false)
  return result
}
