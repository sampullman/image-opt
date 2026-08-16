import { expect, test } from '@playwright/test'
import { OptimizerPage, seedOptions } from './optimizer-page'

test.beforeEach(async ({ page }) => {
  await seedOptions(page, { immediateDownload: false })
})

test.describe('reordering images', () => {
  test('drags an image down the list', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'green.png', 'blue.png')

    await optimizer.row(0).dragTo(optimizer.row(2))

    expect(await optimizer.names()).toEqual(['green.png', 'blue.png', 'red.png'])
  })

  test('drags an image up the list', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'green.png', 'blue.png')

    await optimizer.row(2).dragTo(optimizer.row(0))

    expect(await optimizer.names()).toEqual(['blue.png', 'red.png', 'green.png'])
  })

  test('dropping an image on itself leaves the order alone', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'green.png')

    await optimizer.row(1).dragTo(optimizer.row(1))

    expect(await optimizer.names()).toEqual(['red.png', 'green.png'])
  })

  test('moves an image with the keyboard', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'green.png', 'blue.png')

    await optimizer.grip(2).focus()
    await page.keyboard.press('ArrowUp')
    expect(await optimizer.names()).toEqual(['red.png', 'blue.png', 'green.png'])

    // Focus follows the row it is attached to, so a second press keeps moving
    // the same image rather than whatever landed in that position.
    await page.keyboard.press('ArrowUp')
    expect(await optimizer.names()).toEqual(['blue.png', 'red.png', 'green.png'])

    await page.keyboard.press('ArrowDown')
    expect(await optimizer.names()).toEqual(['red.png', 'blue.png', 'green.png'])
  })

  test('will not move an image past either end of the list', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'green.png')

    await optimizer.grip(0).focus()
    await page.keyboard.press('ArrowUp')
    expect(await optimizer.names()).toEqual(['red.png', 'green.png'])

    await optimizer.grip(1).focus()
    await page.keyboard.press('ArrowDown')
    expect(await optimizer.names()).toEqual(['red.png', 'green.png'])
  })

  test('keeps each row bound to its own image after a reorder', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'blue.png')

    const first = await optimizer.sizes(0)
    await optimizer.row(0).dragTo(optimizer.row(1))

    expect(await optimizer.names()).toEqual(['blue.png', 'red.png'])
    // The moved row keeps its own sizes; a stale key would leave them behind.
    expect(await optimizer.sizes(1)).toEqual(first)
    expect(await optimizer.download(1)).toBe('red.png')
  })

  test('removes the right image after a reorder', async ({ page }) => {
    const optimizer = new OptimizerPage(page)
    await optimizer.goto()
    await optimizer.optimize('red.png', 'green.png', 'blue.png')

    await optimizer.row(0).dragTo(optimizer.row(2))
    await optimizer.remove(1)

    expect(await optimizer.names()).toEqual(['green.png', 'red.png'])
  })
})
