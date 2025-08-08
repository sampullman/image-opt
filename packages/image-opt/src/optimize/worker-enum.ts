import { OptimizeInitOptions } from './optimize-options'

export interface WorkerFileData {
  name?: string
  buffer?: ArrayBuffer
  data?: ImageData
}

export interface WorkerCommand {
  init: OptimizeInitOptions
  file?: WorkerFileData
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
