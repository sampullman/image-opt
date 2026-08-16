import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { jpegOptions, OptimizerPage, seedOptions } from './optimizer-page'

const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff])
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47])

/** Downloads a row and returns the bytes the user would end up with. */
const downloadBytes = async (optimizer: OptimizerPage, index: number) => {
  const downloadPromise = optimizer.page.waitForEvent('download')
  await optimizer.row(index).locator('.download').click()
  const download = await downloadPromise
  return {
    name: download.suggestedFilename(),
    bytes: await readFile(await download.path()),
  }
}

test.describe('output type conversion', () => {
  test('keeps each input format when matching the input', async ({ page }) => {
    await seedOptions(page, { immediateDownload: false, outputType: 'matchInput' })
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'photo.jpg')

    const png = await downloadBytes(optimizer, 0)
    expect(png.name).toBe('red.png')
    expect(png.bytes.subarray(0, 4)).toEqual(PNG_MAGIC)

    const jpeg = await downloadBytes(optimizer, 1)
    expect(jpeg.name).toBe('photo.jpg')
    expect(jpeg.bytes.subarray(0, 3)).toEqual(JPEG_MAGIC)
  })

  test('converts a JPEG to PNG', async ({ page }) => {
    await seedOptions(page, { immediateDownload: false, outputType: 'png' })
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('photo.jpg')

    const { name, bytes } = await downloadBytes(optimizer, 0)
    expect(name).toBe('photo.png')
    expect(bytes.subarray(0, 4)).toEqual(PNG_MAGIC)
  })

  test('converts a PNG to JPEG', async ({ page }) => {
    await seedOptions(page, { immediateDownload: false, outputType: 'jpg' })
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png')

    const { name, bytes } = await downloadBytes(optimizer, 0)
    expect(name).toBe('red.jpg')
    expect(bytes.subarray(0, 3)).toEqual(JPEG_MAGIC)
  })

  test('applies the JPEG quality when converting from PNG', async ({ page }) => {
    const optimizer = new OptimizerPage(page)

    // A PNG input with a JPEG output has to be encoded with the JPEG settings.
    // Looking the settings up by input format instead silently drops them, and
    // the encoder falls back to a quality the user never chose.
    await seedOptions(page, {
      immediateDownload: false,
      outputType: 'jpg',
      jpeg: jpegOptions({ quality: 20 }),
    })
    await optimizer.goto()
    await optimizer.optimize('red.png')
    const low = await downloadBytes(optimizer, 0)

    await seedOptions(page, {
      immediateDownload: false,
      outputType: 'jpg',
      jpeg: jpegOptions({ quality: 95 }),
    })
    await page.reload()
    await optimizer.optimize('red.png')
    const high = await downloadBytes(optimizer, 0)

    expect(low.bytes.subarray(0, 3)).toEqual(JPEG_MAGIC)
    expect(high.bytes.subarray(0, 3)).toEqual(JPEG_MAGIC)
    expect(high.bytes.length).toBeGreaterThan(low.bytes.length * 1.5)
  })
})
