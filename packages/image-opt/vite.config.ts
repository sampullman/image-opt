import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { defineConfig } from 'vite'
import { libConfig } from './vite-lib-base'

export default defineConfig(
  libConfig({
    entry: ['./src/index.ts', './src/index-optimize.ts'],
    outDir: './dist',
    plugins: [
      // Without a filter the plugin picks an entry arbitrarily; the styles
      // belong to the components, which only `index.js` has.
      cssInjectedByJsPlugin({
        jsAssetsFilterFunction: (chunk) => chunk.fileName === 'index.js',
      }),
    ],
  }),
)
