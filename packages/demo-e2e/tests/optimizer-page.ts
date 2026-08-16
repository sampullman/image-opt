import { expect, Locator, Page } from '@playwright/test'
import { join } from 'node:path'

const FIXTURE_DIR = join(__dirname, '..', 'fixtures')

export const fixture = (name: string): string => join(FIXTURE_DIR, name)

/** Mirrors the widget's stored JPEG settings; nested state must be complete. */
export interface IJpegOptionState {
  quality: number
  optimizer: 'jpegli' | 'mozjpeg'
  mozProgressive: boolean
  /** `JpegliChroma`: 0 is 4:4:4, 1 is 4:2:2, 2 is 4:2:0, 3 is 4:4:0. */
  chromaSubsampling: number
  progressiveLevel: number
  optimizeCoding: number
  adaptiveQuantization: number
  standardQuantTables: number
  fancyDownsampling: number
  dctMethod: number
}

export const jpegOptions = (
  overrides: Partial<IJpegOptionState> = {},
): IJpegOptionState => ({
  quality: 75,
  optimizer: 'jpegli',
  mozProgressive: true,
  chromaSubsampling: 2,
  progressiveLevel: 2,
  optimizeCoding: 1,
  adaptiveQuantization: 1,
  standardQuantTables: 0,
  fancyDownsampling: 1,
  dctMethod: 0,
  ...overrides,
})

export interface IOptionOverrides {
  immediateDownload?: boolean
  keepImageData?: boolean
  outputType?: 'matchInput' | 'jpg' | 'png'
  selectedType?: 'jpeg' | 'png'
  poolSize?: number
  jpeg?: Partial<IJpegOptionState>
}

/**
 * Seeds the widget's persisted options before any app code runs.
 *
 * `__version: 0` never matches the store's version, which makes vue-store run
 * its migration path: every key we pass here is merged over the real defaults,
 * and anything we omit keeps its default. Writing a "current" version instead
 * would replace the state wholesale and leave omitted keys undefined.
 *
 * vue-store's own merge is shallow, so nested state such as `jpeg` arrives
 * whole; the store fills the keys back in behind it, which is what lets a
 * partial `jpeg` object -- or one saved before an option existed -- work here.
 * `jpegOptions()` builds a complete one where the test wants to be explicit.
 */
export const seedOptions = async (page: Page, overrides: IOptionOverrides) => {
  await page.addInitScript((state) => {
    localStorage.setItem('options-store', JSON.stringify({ state, __version: 0 }))
  }, overrides)
}

/** Parses a "64.5 KB" / "812 B" label back into a byte count. */
export const parseSize = (text: string): number => {
  const match = /^([\d.]+)\s*(B|KB|MB)$/.exec(text.trim())
  if (!match) {
    throw new Error(`Unrecognized size label: "${text}"`)
  }
  const scale = { B: 1, KB: 1000, MB: 1000000 }[match[2] as 'B' | 'KB' | 'MB']
  return Number(match[1]) * scale
}

export class OptimizerPage {
  readonly page: Page
  readonly fileInput: Locator
  readonly error: Locator
  readonly list: Locator
  readonly rows: Locator
  readonly clearAll: Locator

  constructor(page: Page) {
    this.page = page
    this.fileInput = page.locator('input.o-upload')
    this.error = page.locator('.optimizer .error')
    this.list = page.locator('.image-list')
    this.rows = page.locator('.image-list .row.image')
    this.clearAll = page.locator('.image-list .row.header .actions')
  }

  async goto() {
    await this.page.goto('/')
    await expect(this.page.locator('.optimizer')).toBeVisible()
  }

  /** Selects files and waits until every one of them has been optimized. */
  async optimize(...names: string[]) {
    const before = await this.rows.count()
    await this.fileInput.setInputFiles(names.map(fixture))
    await expect(this.rows).toHaveCount(before + names.length)
  }

  row(index: number): Locator {
    return this.rows.nth(index)
  }

  rowByName(name: string): Locator {
    return this.rows.filter({ has: this.page.locator('.file-name', { hasText: name }) })
  }

  /** The reorder handle of a row, which is also the keyboard target. */
  grip(index: number): Locator {
    return this.row(index).locator('.grip')
  }

  /** File names in list order. */
  async names(): Promise<string[]> {
    return (await this.rows.locator('.file-name').allTextContents()).map((n) => n.trim())
  }

  async sizes(index: number): Promise<{ before: number; after: number; saved: string }> {
    const row = this.row(index)
    return {
      before: parseSize(await row.locator('.before').innerText()),
      after: parseSize(await row.locator('.after').innerText()),
      saved: (await row.locator('.saved').innerText()).trim(),
    }
  }

  /** Clicks a row's download icon and returns the suggested file name. */
  async download(index: number): Promise<string> {
    const downloadPromise = this.page.waitForEvent('download')
    await this.row(index).locator('.download').click()
    return (await downloadPromise).suggestedFilename()
  }

  async remove(index: number) {
    await this.row(index).locator('.trash').click()
  }

  /** A toggle in the options panel, e.g. "Keep image data". */
  option(label: string): Locator {
    return this.page.getByRole('checkbox', { name: label })
  }

  async toggleOption(label: string) {
    await this.option(label).click()
  }

  async isOptionChecked(label: string): Promise<boolean> {
    return (await this.option(label).getAttribute('aria-checked')) === 'true'
  }
}
