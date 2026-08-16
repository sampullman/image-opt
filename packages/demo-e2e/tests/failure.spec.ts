import { expect, test } from '@playwright/test'
import { OptimizerPage, seedOptions } from './optimizer-page'

test.beforeEach(async ({ page }) => {
  await seedOptions(page, { immediateDownload: false })
})

test.describe('failed images', () => {
  test('lists an image that could not be optimized', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    // The encoder lives in a worker and loads its WASM over the network, so
    // breaking that request is how a real optimize failure reaches the list.
    await page.route('**/*.wasm', (route) => route.fulfill({ status: 404 }))
    await optimizer.goto()
    await optimizer.optimize('red.png')

    const row = optimizer.row(0)
    await expect(row).toHaveClass(/failed/)
    await expect(row.locator('.file-name')).toHaveText('red.png')
    await expect(row.locator('.row-error')).not.toBeEmpty()
    // The input size is still known; there is no output to describe
    await expect(row.locator('.before')).toHaveText(/KB/)
    await expect(row.locator('.after')).toHaveText('—')
    await expect(row.locator('.saved')).toHaveText('—')
    await expect(row.locator('.download')).toHaveClass(/disabled/)
  })

  test('keeps the images that succeeded alongside one that failed', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    let failed = 0
    // Fail only the first WASM request, so the other workers still encode
    await page.route('**/*.wasm', (route) => {
      if (failed === 0) {
        failed += 1
        return route.fulfill({ status: 404 })
      }
      return route.continue()
    })
    await optimizer.goto()
    await optimizer.optimize('red.png', 'green.png', 'blue.png')

    expect(await optimizer.names()).toEqual(['red.png', 'green.png', 'blue.png'])
    const failedRows = optimizer.rows.filter({ has: page.locator('.row-error') })
    await expect(failedRows).toHaveCount(1)
    await expect(
      optimizer.rows.filter({ hasNot: page.locator('.row-error') }),
    ).toHaveCount(2)
  })

  test('a failed image can still be removed and reordered', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await page.route('**/*.wasm', (route) => route.fulfill({ status: 404 }))
    await optimizer.goto()
    await optimizer.optimize('red.png', 'green.png')

    await optimizer.row(0).dragTo(optimizer.row(1))
    expect(await optimizer.names()).toEqual(['green.png', 'red.png'])

    await optimizer.remove(0)
    expect(await optimizer.names()).toEqual(['red.png'])
  })
})
