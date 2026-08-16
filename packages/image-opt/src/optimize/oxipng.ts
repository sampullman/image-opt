import init, { optimize, InitOutput } from '../wasm/oxipng/image_opt'
import { urlFromString } from '../util'

export interface IOxipngOptions {
  level?: number
  interlace?: boolean
}

export const defaultOxipngOptions: IOxipngOptions = {
  level: 3,
  interlace: false,
}

let oxipngInit: Promise<InitOutput> | undefined

// As `initJpegli`
export const initOxipng = (oxipngWasm: string | undefined): Promise<InitOutput> => {
  if (!oxipngInit) {
    oxipngInit = init(urlFromString(oxipngWasm)).catch((e) => {
      oxipngInit = undefined
      throw e
    })
  }
  return oxipngInit
}

export const optimizeOxipng = (data: Uint8Array, options?: IOxipngOptions) => {
  const result = optimize(data, options?.level ?? 3, options?.interlace ?? false)
  return result
}
