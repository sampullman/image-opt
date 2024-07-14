import { AssetContentType, ValidatedFile } from '../util'
import {
  IMozjpegOptions,
  defaultMozjpegOptions,
  initMozjpeg,
  optimizeMozjpeg,
} from './mozjpeg'
import { OptimizeInitOptions } from './optimize-options'
import { IOxipngOptions, initOxipng, optimizeOxipng } from './oxipng'

export const optimizeInitWrap = (options: OptimizeInitOptions) => {
  const { assetType, mozjpegWasm, oxipngWasm } = options
  if (assetType === AssetContentType.Png) {
    return initOxipng(oxipngWasm)
  } else if (assetType === AssetContentType.Jpeg) {
    return initMozjpeg(mozjpegWasm)
  }
}

export const optimizeImageWrap = async (
  validFile: ValidatedFile,
  assetType: AssetContentType,
  options: unknown,
): Promise<Uint8Array | undefined> => {
  const { data, file } = validFile
  if (assetType === AssetContentType.Png) {
    const array = new Uint8Array(await file.arrayBuffer())
    return optimizeOxipng(array, options as IOxipngOptions)
  } else if (assetType == AssetContentType.Jpeg) {
    return optimizeMozjpeg(data, options as IMozjpegOptions)
  }
}

export const getDefaultOptions = (file: ValidatedFile): Record<string, unknown> => {
  if (file.type === AssetContentType.Png) {
    const options: IOxipngOptions = { level: 3 }
    return options as Record<string, unknown>
  } else if (file.type === AssetContentType.Jpeg) {
    const options: IMozjpegOptions = {
      ...defaultMozjpegOptions,
    }
    return options as unknown as Record<string, unknown>
  }
  return {}
}
