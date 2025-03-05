import { AssetContentType, CONTENT_TYPES } from './content-types'

export interface MediaRequirements {
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  ext?: string[]
  types?: AssetContentType[]
  size?: number
}

export interface ValidatedFile {
  file: File
  originalSize: number // Track original size to avoid loss during format conversion
  type: AssetContentType
  src?: string
  data: ImageData
}

export interface IValidateMediaError {
  fileErrors: string[]
}

async function fileToImageData(file: File): Promise<ImageData> {
  // Prefer createImageBitmap as it's the off-thread option for Firefox.
  const dPromise = 'createImageBitmap' in self ? createImageBitmap(file) : blobToImg(file)
  const drawable = await dPromise

  const width = drawable.width,
    height = drawable.height,
    sw = drawable.width,
    sh = drawable.height

  // Make canvas same size as image
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  // Draw image onto canvas
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not create canvas context')
  ctx.drawImage(drawable, 0, 0, sw, sh, 0, 0, width, height)
  return ctx.getImageData(0, 0, width, height)
}

async function decodeImage(url: string): Promise<HTMLImageElement> {
  const img = new Image()
  img.decoding = 'async'
  img.src = url
  const loaded = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(Error('Image loading error'))
  })

  if (img.decode) {
    // Nice off-thread way supported in Safari/Chrome.
    // Safari throws on decode if the source is SVG.
    // https://bugs.webkit.org/show_bug.cgi?id=188347
    await img.decode().catch(() => null)
  }
  // Always await loaded, as we may have bailed due to the Safari bug above.
  await loaded
  return img
}

export async function blobToImg(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob)

  try {
    return await decodeImage(url)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function convertJpegToPngFile(jpeg: File): Promise<File> {
  const img: HTMLImageElement = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = event.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(jpeg)
  })
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')

  // Draw JPEG onto canvas
  ctx?.drawImage(img, 0, 0)

  // Convert canvas to PNG Blob
  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/png')
  })
  if (!blob) {
    throw new Error('Failed to create PNG blob.')
  }

  // Try creating a File object (if supported)
  try {
    return new File([blob as Blob], jpeg.name.replace(/\.jpe?g$/, '.png'), {
      type: 'image/png',
    })
  } catch (error) {
    console.warn('File constructor not supported, returning Blob instead.', error)
    return jpeg
  }
}

export async function validateMedia(
  requirements: MediaRequirements,
  file: File,
): Promise<ValidatedFile> {
  const errors: string[] = []
  const validTypes = requirements.types ?? CONTENT_TYPES
  const type = file.type as AssetContentType

  const { ext, size } = requirements
  const reqSize = size ?? 0
  if (reqSize && file.size > reqSize) {
    errors.push('FILE_SIZE_BIG')
  }
  const fileExt = file.name.split('.').pop()
  if ((ext && (!fileExt || !ext.includes(fileExt))) || !validTypes.includes(type)) {
    errors.push('FILE_TYPE')
  }
  if (errors.length) {
    throw { fileErrors: errors }
  }

  try {
    const fileType = file.type || ''
    if (fileType.includes('image')) {
      const img = await fileToImageData(file)
      const { minWidth, minHeight, maxWidth, maxHeight } = requirements
      const { width: imgWidth = 0, height: imgHeight = 0 } = img ?? {}
      if (minWidth && imgWidth < minWidth) {
        errors.push('Image width too small')
      }
      if (minHeight && imgHeight < minHeight) {
        errors.push('Image height too small')
      }
      if (maxWidth && imgWidth > maxWidth) {
        errors.push('Image width too large')
      }
      if (maxHeight && imgHeight > maxHeight) {
        errors.push('Image height too large')
      }

      if (!errors.length) {
        return {
          file,
          originalSize: file.size,
          type,
          data: img,
        }
      }
    }
  } catch (error) {
    errors.push('FILE_TYPE')
  }
  throw { fileErrors: errors || ['unknown'] }
}
