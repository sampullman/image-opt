export enum AssetContentType {
  Png = 'image/png',
  Jpeg = 'image/jpeg',
}

export enum OutputType {
  MatchInput = 'matchInput',
  Jpeg = 'jpg',
  Png = 'png',
}

export const contentTypeToExt = (contentType: AssetContentType): string => {
  switch (contentType) {
    case AssetContentType.Png:
      return 'png'
    case AssetContentType.Jpeg:
      return 'jpg'
  }
}

// Converts OutputType to AssetContentType, falling back to input type on OutputType.MatchInput
export const outputTypeToAssetType = (
  outputType: OutputType,
  inputType: AssetContentType,
): AssetContentType => {
  switch (outputType) {
    case OutputType.MatchInput:
      return inputType
    case OutputType.Jpeg:
      return AssetContentType.Jpeg
    case OutputType.Png:
      return AssetContentType.Png
  }
}

export const CONTENT_TYPES = Object.values(AssetContentType)
