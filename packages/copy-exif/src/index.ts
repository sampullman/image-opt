import piexif from 'piexifjs'

export * from './copy-exif'

function arrayBufferToDataUrl(buffer: ArrayBuffer): string {
  const base64 = Buffer.from(buffer).toString('base64')
  return `data:image/jpeg;base64,${base64}`
}

function dataUrlToArrayBuffer(dataUrl: string): ArrayBuffer {
  const base64 = dataUrl.replace(/^.*?,/, '')
  const buffer = Buffer.from(base64, 'base64')
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
}

export function readExif(jpeg: ArrayBuffer): string | null {
  const dataUrl = arrayBufferToDataUrl(jpeg)
  const exifData = piexif.load(dataUrl)

  if (
    Object.keys(exifData['0th']).length === 0 &&
    Object.keys(exifData['Exif']).length === 0 &&
    Object.keys(exifData['GPS']).length === 0 &&
    Object.keys(exifData['1st']).length === 0
  ) {
    return null
  }
  return JSON.stringify(exifData)
}

export function writeExif(jpeg: ArrayBuffer, exifData: string): ArrayBuffer {
  const dataUrl = arrayBufferToDataUrl(jpeg)
  const exifObj = JSON.parse(exifData)
  const newExifDump = piexif.dump(exifObj)
  const newDataUrl = piexif.insert(newExifDump, dataUrl)
  return dataUrlToArrayBuffer(newDataUrl)
}
