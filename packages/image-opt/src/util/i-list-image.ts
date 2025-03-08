import { ValidatedFile } from './validate-media'

export interface IListImage {
  file: ValidatedFile
  result: Uint8Array
  error?: string
}
