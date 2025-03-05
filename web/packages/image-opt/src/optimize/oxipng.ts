import init, { optimize, InitOutput } from '../../../../../oxipng/pkg/image_opt'
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

export const optimizeOxipng = (buffer: ArrayBuffer, options?: IOxipngOptions) => {
  const array = new Uint8Array(buffer)
  console.log('IMAGE OPTIONS', options)
  const result = optimize(array, options?.level ?? 3, options?.interlace ?? false)
  return result
}
