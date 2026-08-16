import { OptimizerType, WasmInitOptions } from './optimize-options'

/** The image as it crosses into the worker; only the half to be read is sent. */
export interface WorkerFileData {
  buffer?: ArrayBuffer
  data?: ImageData
}

export interface WorkerCommand {
  init: WasmInitOptions
  file: WorkerFileData
  optimizer: OptimizerType
  /** Options for `optimizer`; the worker pairs them back up on arrival. */
  options?: unknown
}

export interface WorkerResult {
  type: WorkerResultType
  output?: unknown
}

export enum WorkerResultType {
  Complete = 'complete',
  Error = 'error',
}
