export * from './save-file'
export * from './validate-media'
export * from './content-types'
export * from './i-list-image'

// A relative URL cannot be resolved inside the worker, which runs from a
// `blob:` URL with an opaque path. Call this on the page, before sending.
export const absoluteUrl = (url: string): string => new URL(url, self.location.href).href

export const urlFromString = (str: string | undefined): URL | undefined => {
  if (str) {
    return new URL(str, self.location.href)
  }
  return undefined
}
