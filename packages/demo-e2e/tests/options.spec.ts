import { expect, test } from '@playwright/test'
import { jpegOptions, OptimizerPage, seedOptions } from './optimizer-page'

test.describe('encode options', () => {
  test('toggles and persists a checkbox option', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()

    expect(await optimizer.isOptionChecked('Download result immediately')).toBe(true)
    await optimizer.toggleOption('Download result immediately')
    expect(await optimizer.isOptionChecked('Download result immediately')).toBe(false)

    await page.reload()
    expect(await optimizer.isOptionChecked('Download result immediately')).toBe(false)
  })

  test('toggles an option from the keyboard', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()

    const option = optimizer.option('Keep image data')
    await option.focus()
    await expect(option).toHaveAttribute('aria-checked', 'true')

    await page.keyboard.press('Space')
    await expect(option).toHaveAttribute('aria-checked', 'false')

    await page.keyboard.press('Enter')
    await expect(option).toHaveAttribute('aria-checked', 'true')
  })

  test('writes the output type through to the downloaded file name', async ({ page }) => {
    await seedOptions(page, { immediateDownload: false, outputType: 'png' })
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('photo.jpg')

    expect(await optimizer.download(0)).toBe('photo.png')
  })

  test('switches the quality slider label with the selected file type', async ({
    page,
  }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()

    const quality = page.locator('#quality')
    await expect(quality).toContainText('Quality')

    const fileType = page.locator('.file-type-wrap').first().locator('.st-multiselect')
    await fileType.click()
    await fileType
      .locator('.st-ms-dropdown .ms-item')
      .getByText('png', { exact: true })
      .click()

    await expect(quality).toContainText('Level')
  })

  test('still describes an image after releasing its data', async ({ page }) => {
    await seedOptions(page, { immediateDownload: false, keepImageData: false })
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png')

    // The bytes are gone, so the row cannot be downloaded, but everything the
    // row reports about the image has to stay accurate.
    await expect(optimizer.row(0).locator('.file-name')).toHaveText('red.png')
    await expect(optimizer.row(0).locator('.download')).toHaveClass(/disabled/)

    const { before, after, saved } = await optimizer.sizes(0)
    expect(after).toBeGreaterThan(0)
    expect(after).toBeLessThan(before)
    expect(saved).toMatch(/^\d+%$/)
  })

  test('shows advanced jpegli options on demand', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()

    await expect(page.locator('.advanced-options-content')).toBeHidden()
    await page.locator('.toggle-advanced').click()
    await expect(page.locator('.advanced-options-content')).toBeVisible()
    await expect(page.locator('#progressive')).toContainText('Progressive Level')
  })

  test('picks a chroma subsampling ratio and keeps it', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await page.locator('.toggle-advanced').click()

    const chroma = page.locator('.chroma-wrap .st-multiselect')
    await expect(chroma).toContainText('4:2:0')

    await chroma.click()
    await chroma.locator('.st-ms-dropdown .ms-item').getByText('4:4:4').click()
    await expect(chroma).toContainText('4:4:4')

    await page.reload()
    await page.locator('.toggle-advanced').click()
    await expect(page.locator('.chroma-wrap .st-multiselect')).toContainText('4:4:4')
  })

  test('falls back to a default for an option the stored settings predate', async ({
    page,
  }) => {
    // Settings saved before chroma subsampling was an option. The whole `jpeg`
    // object is restored as it was, so the store has to fill the gap itself.
    const { chromaSubsampling: _, ...stored } = jpegOptions()
    await seedOptions(page, { immediateDownload: false, jpeg: stored })

    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await page.locator('.toggle-advanced').click()
    await expect(page.locator('.chroma-wrap .st-multiselect')).toContainText('4:2:0')

    await optimizer.optimize('photo.jpg')
    const { before, after } = await optimizer.sizes(0)
    expect(after).toBeGreaterThan(0)
    expect(after).toBeLessThan(before)
  })

  test('keeps more chroma detail, and more bytes, at 4:4:4 than at 4:2:0', async ({
    page,
  }) => {
    const sizeAt = async (chromaSubsampling: number): Promise<number> => {
      await seedOptions(page, {
        immediateDownload: false,
        jpeg: jpegOptions({ chromaSubsampling }),
      })
      const optimizer = new OptimizerPage(page)
      await optimizer.goto()
      await optimizer.optimize('photo.jpg')
      return (await optimizer.sizes(0)).after
    }

    // Subsampling is the one option here that trades file size for color
    // detail, so the sizes are what says it reached the encoder at all.
    expect(await sizeAt(0)).toBeGreaterThan(await sizeAt(2))
  })
})
