export interface WasmInitOptions {
  oxipngWasm?: string
  mozjpegWasm?: string
  jpegliWasm?: string
}

export enum OptimizerType {
  Oxipng = 'oxipng',
  Mozjpeg = 'mozjpeg',
  Jpegli = 'jpegli',
}

export interface OptimizeInitOptions extends WasmInitOptions {
  optimizer: OptimizerType
}
