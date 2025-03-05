export enum AssetContentType {
  Png = 'image/png',
  Jpeg = 'image/jpeg',
}

export const contentTypeToExt = (contentType: AssetContentType): string => {
  switch (contentType) {
    case AssetContentType.Png:
      return 'png'
    case AssetContentType.Jpeg:
      return 'jpg'
  }
}

export const CONTENT_TYPES = Object.values(AssetContentType)
