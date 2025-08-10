import { AssetContentType, ValidatedFile } from '../util'
import { IOptimizerJpegOptions, IOptimizerPngOptions } from '../store'
import { initJpegli, optimizeJpegli } from './jpegli'
import {
  IMozjpegOptions,
  defaultMozjpegOptions,
  initMozjpeg,
  optimizeMozjpeg,
} from './mozjpeg'
import { Optimizer, OptimizeInitOptions } from './optimize-options'
import { initOxipng, optimizeOxipng } from './oxipng'

export const optimizeInitWrap = (options: OptimizeInitOptions) => {
  const { assetType, jpegliWasm, mozjpegWasm, oxipngWasm } = options
  if (assetType === AssetContentType.Png) {
    return initOxipng(oxipngWasm)
  } else if (assetType === AssetContentType.Jpeg) {
    if (options.optimizer === Optimizer.Jpegli) {
      return initJpegli(jpegliWasm)
    } else {
      return initMozjpeg(mozjpegWasm)
    }
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
    return optimizeOxipng(array, options as IOptimizerPngOptions)
  } else if (assetType == AssetContentType.Jpeg) {
    const jpegOptions = options as IOptimizerJpegOptions
    if (jpegOptions.preserveMetadata) {
      return new Uint8Array(await file.arrayBuffer())
    }
    if (jpegOptions.optimizer === Optimizer.Jpegli) {
      return optimizeJpegli(data, jpegOptions)
    } else {
      return optimizeMozjpeg(data, jpegOptions as unknown as IMozjpegOptions)
    }
  }
}

export const getDefaultOptions = (
  fileType: AssetContentType,
  options?: Record<string, unknown>,
): Record<string, unknown> => {
  if (fileType === AssetContentType.Png) {
    const pngOptions: IOptimizerPngOptions = { level: 3, strip: true }
    return pngOptions as Record<string, unknown>
  } else if (fileType === AssetContentType.Jpeg) {
    const jpegOptions = options as IOptimizerJpegOptions
    if (jpegOptions.optimizer === Optimizer.Jpegli) {
      return jpegOptions as unknown as Record<string, unknown>
    } else {
      const mozjpegOptions: IMozjpegOptions = {
        ...defaultMozjpegOptions,
      }
      return mozjpegOptions as unknown as Record<string, unknown>
    }
  }
  return {}
}
