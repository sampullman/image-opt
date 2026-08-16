import { expect, test } from '@playwright/test'
import { fixture, OptimizerPage, seedOptions } from './optimizer-page'

test.beforeEach(async ({ page }) => {
  // Downloading every result is the default, but it makes each test wait on the
  // browser's download machinery for no benefit. Downloads get their own test.
  await seedOptions(page, { immediateDownload: false })
})

test.describe('optimizing images', () => {
  test('optimizes a PNG and reports the size saved', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png')

    await expect(optimizer.row(0).locator('.file-name')).toHaveText('red.png')

    const { before, after, saved } = await optimizer.sizes(0)
    expect(after).toBeLessThan(before)
    expect(saved).toMatch(/^\d+%$/)
  })

  test('optimizes a JPEG and reports the size saved', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('photo.jpg')

    await expect(optimizer.row(0).locator('.file-name')).toHaveText('photo.jpg')

    const { before, after, saved } = await optimizer.sizes(0)
    expect(after).toBeLessThan(before)
    expect(saved).toMatch(/^\d+%$/)
  })

  test('optimizes several files in one selection', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'green.png', 'blue.png')

    expect(await optimizer.names()).toEqual(['red.png', 'green.png', 'blue.png'])
    for (let i = 0; i < 3; i += 1) {
      const { before, after } = await optimizer.sizes(i)
      expect(after).toBeGreaterThan(0)
      expect(after).toBeLessThan(before)
    }
  })

  test('appends to the list across separate selections', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png')
    await optimizer.optimize('photo.jpg', 'blue.png')

    expect(await optimizer.names()).toEqual(['red.png', 'photo.jpg', 'blue.png'])
  })

  test('rejects a file that is not an image', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.fileInput.setInputFiles([fixture('notes.txt')])

    await expect(optimizer.error).toHaveText('Unsupported file type')
    await expect(optimizer.list).toBeHidden()
  })

  test('clears a previous error on the next successful selection', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.fileInput.setInputFiles([fixture('notes.txt')])
    await expect(optimizer.error).toBeVisible()

    await optimizer.optimize('red.png')
    await expect(optimizer.error).toBeHidden()
  })
})
