export * from './save-file'
export * from './validate-media'
export * from './content-types'
export * from './i-list-image'

export const urlFromString = (str: string | undefined): URL | undefined => {
  if (str) {
    return new URL(str)
  }
  return undefined
}
