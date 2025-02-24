import { AssetContentType } from '../util'

export interface WasmInitOptions {
  oxipngWasm?: string
  mozjpegWasm?: string
  jpegliWasm?: string
}

export enum Optimizer {
  Oxipng = 'oxipng',
  Mozjpeg = 'mozjpeg',
  Jpegli = 'jpegli',
}

export interface OptimizeInitOptions extends WasmInitOptions {
  assetType: AssetContentType
  optimizer: Optimizer
}
