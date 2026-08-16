import { expect, test } from '@playwright/test'
import { OptimizerPage } from './optimizer-page'

test.describe('demo page', () => {
  test('renders the optimizer widget', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()

    await expect(page).toHaveTitle('Image Optimizer')
    await expect(page.getByRole('heading', { name: 'Image Optimizer' })).toBeVisible()
    await expect(page.locator('.o-upload-title')).toHaveText('Select PNG/JPEG')
    await expect(optimizer.fileInput).toHaveAttribute('accept', 'image/png,image/jpeg')
  })

  test('shows no image list until a file is optimized', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()

    await expect(optimizer.list).toBeHidden()
    await expect(page.locator('.encode-options')).toBeVisible()
  })

  test('clicking the upload area opens a file picker', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()

    // The visible upload area is an overlay; the file input underneath it is
    // what actually receives the click.
    const chooserPromise = page.waitForEvent('filechooser')
    await page.locator('.o-upload-wrap').click()
    const chooser = await chooserPromise

    expect(chooser.isMultiple()).toBe(true)
  })
})
