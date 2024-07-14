import { AssetContentType } from '../util'

export interface WasmInitOptions {
  oxipngWasm?: string
  mozjpegWasm?: string
}

export interface OptimizeInitOptions extends WasmInitOptions {
  assetType: AssetContentType
}
