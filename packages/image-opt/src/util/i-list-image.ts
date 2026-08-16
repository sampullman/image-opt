import { ValidatedFile } from './validate-media'

export interface IListImage {
  // Stable across reordering, unlike the list index or the file name
  id: string
  file: ValidatedFile
  result: Uint8Array
  // Size of the optimized image. Tracked separately because `result` is
  // released once the image has been downloaded, if image data is not kept.
  resultSize: number
  error?: string
}

// Drops the decoded pixels and encoded bytes an image is holding on to, keeping
// only what the list needs to describe it. The row can no longer be downloaded.
export const releaseImageData = (image: IListImage) => {
  const { file } = image.file
  image.result = new Uint8Array()
  image.file = {
    ...image.file,
    file: new File([], file.name, { type: file.type }),
    data: new ImageData(1, 1),
  }
}

let imageId = 0

export const nextImageId = (): string => {
  imageId += 1
  return `image-${imageId}`
}

// Moves an image within a list, returning a new list. Out of range indexes and
// no-op moves return the original list.
export const moveImage = (
  images: IListImage[],
  from: number,
  to: number,
): IListImage[] => {
  const inRange = (i: number) => Number.isInteger(i) && i >= 0 && i < images.length
  if (from === to || !inRange(from) || !inRange(to)) {
    return images
  }
  const moved = [...images]
  const [image] = moved.splice(from, 1)
  moved.splice(to, 0, image)
  return moved
}
