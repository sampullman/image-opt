// Regenerates the committed image fixtures.
//
//   pnpm --filter image-opt-demo-e2e run fixtures
//
// The fixtures are committed so the test run itself stays hermetic; this script
// only needs to be re-run when a fixture's content or size should change.
// Chromium (already required by Playwright) does the encoding, so there is no
// extra image dependency.
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const outDir = dirname(fileURLToPath(import.meta.url))

// Drawn on a canvas in the browser. Flat blocks plus a gradient give oxipng and
// jpegli something to actually compress, without making the fixtures large.
const draw = (width, height, seed) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, `hsl(${seed}, 70%, 45%)`)
  gradient.addColorStop(1, `hsl(${(seed + 120) % 360}, 70%, 75%)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  const block = Math.round(width / 8)
  for (let y = 0; y < height; y += block) {
    for (let x = 0; x < width; x += block) {
      if ((x / block + y / block) % 3 === 0) {
        ctx.fillStyle = `hsl(${(seed + x + y) % 360}, 60%, 30%)`
        ctx.fillRect(x, y, block, block)
      }
    }
  }
  return canvas
}

const encode = (canvas, type, quality) =>
  new Promise((resolve) => {
    canvas.toBlob(
      (blob) => blob.arrayBuffer().then((b) => resolve(Array.from(new Uint8Array(b)))),
      type,
      quality,
    )
  })

const IMAGES = [
  { name: 'red.png', width: 320, height: 240, seed: 0, type: 'image/png' },
  { name: 'green.png', width: 256, height: 256, seed: 120, type: 'image/png' },
  { name: 'blue.png', width: 200, height: 150, seed: 220, type: 'image/png' },
  {
    name: 'photo.jpg',
    width: 480,
    height: 360,
    seed: 40,
    type: 'image/jpeg',
    quality: 0.95,
  },
]

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('about:blank')

for (const image of IMAGES) {
  const bytes = await page.evaluate(
    async ({ width, height, seed, type, quality, drawSrc, encodeSrc }) => {
      const drawFn = new Function(`return ${drawSrc}`)()
      const encodeFn = new Function(`return ${encodeSrc}`)()
      return encodeFn(drawFn(width, height, seed), type, quality)
    },
    { ...image, drawSrc: draw.toString(), encodeSrc: encode.toString() },
  )
  const buffer = Buffer.from(bytes)
  writeFileSync(join(outDir, image.name), buffer)
  console.log(`${image.name}: ${buffer.length} bytes`)
}

// Used to exercise the widget's rejection path for unsupported files.
writeFileSync(join(outDir, 'notes.txt'), 'not an image\n')
console.log('notes.txt: written')

await browser.close()
