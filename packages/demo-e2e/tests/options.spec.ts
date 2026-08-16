import { expect, test } from '@playwright/test'
import { OptimizerPage, seedOptions } from './optimizer-page'

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
})
