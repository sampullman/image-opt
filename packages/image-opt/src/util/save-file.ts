import {
  AssetContentType,
  contentTypeToExt,
  OutputType,
  outputTypeToAssetType,
} from './content-types'
import { IListImage } from './i-list-image'

const replaceExt = (fileName: string, outputType: AssetContentType): string => {
  const ext = contentTypeToExt(outputType)
  const fileArr = fileName.split('.')
  if (fileArr.length > 1) {
    fileArr[fileArr.length - 1] = ext
    return fileArr.join('.')
  }
  return `${fileArr}.${ext}`
}

export const saveImage = (image: IListImage, outputType: OutputType) => {
  const assetType = outputTypeToAssetType(outputType, image.file.type)
  const name = replaceExt(image.file.file.name || 'opt.png', assetType)
  saveFile(name, image.result, assetType)
}

export const saveFile = (
  filename: string,
  data: string | Uint8Array,
  fileType: string,
) => {
  const blob = new Blob([data], { type: fileType })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navAny = window.navigator as any
  if (navAny.msSaveOrOpenBlob) {
    navAny.msSaveBlob(blob, filename)
  } else {
    const elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = filename
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }
}
