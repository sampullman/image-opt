import { defineConfig, devices } from '@playwright/test'

// The demo hardcodes this origin when building the WASM/worker URLs it passes to
// the widget, so the dev server has to be reachable at exactly this address.
export const DEMO_URL = 'http://127.0.0.1:3050'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  // Decoding and re-encoding images through WASM is slower than a typical DOM
  // assertion, especially on a cold worker pool.
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: DEMO_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // The demo imports the built library, so it has to exist before Vite starts.
    command:
      'pnpm --filter @samatech/image-opt run build && pnpm --filter image-opt-demo run dev',
    url: DEMO_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
})
