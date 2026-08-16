import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { defineConfig } from 'vite'
import { libConfig } from './vite-lib-base'

export default defineConfig(
  libConfig({
    entry: './src/index.ts',
    outDir: './dist',
    plugins: [cssInjectedByJsPlugin()],
  }),
)
