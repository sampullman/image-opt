import { expect, test } from '@playwright/test'
import { OptimizerPage, seedOptions } from './optimizer-page'

test.beforeEach(async ({ page }) => {
  await seedOptions(page, { immediateDownload: false })
})

test.describe('image list', () => {
  test('removes a single image and leaves the rest', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'green.png', 'blue.png')

    await optimizer.remove(1)

    expect(await optimizer.names()).toEqual(['red.png', 'blue.png'])
  })

  test('clears every image', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'green.png')

    await optimizer.clearAll.click()

    await expect(optimizer.list).toBeHidden()
  })

  test('downloads a result under its original name', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'photo.jpg')

    expect(await optimizer.download(0)).toBe('red.png')
    expect(await optimizer.download(1)).toBe('photo.jpg')
  })

  test('downloads immediately when the option is enabled', async ({ page }) => {
    await seedOptions(page, { immediateDownload: true })
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()

    const downloadPromise = page.waitForEvent('download')
    await optimizer.optimize('red.png')

    expect((await downloadPromise).suggestedFilename()).toBe('red.png')
  })
})
