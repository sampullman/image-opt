import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { defineConfig, Plugin } from 'vite'
import { libConfig } from './vite-lib-base'

const outputName = 'image-opt.es.js'

// The export bundle is loaded by a page that already has Vue on `window`, so
// the import rollup left in place is rewritten to read from there.
const externalVue = (bundleName: string): Plugin => {
  return {
    name: 'rollup-plugin-external-vue',
    generateBundle(_options, bundle) {
      const chunk = bundle[bundleName]
      if (chunk?.type === 'chunk') {
        chunk.code = chunk.code.replace(
          /import\s+?\{(.*?)\}\s+?from "vue"/,
          (_match, capture: string) => {
            return `const {${capture.replaceAll(' as', ':')}} = window.Vue`
          },
        )
      }
    },
  }
}

export default defineConfig(
  libConfig({
    entry: './src/index-optimizer.ts',
    outDir: './dist-export',
    fileName: outputName,
    plugins: [
      libAssetsPlugin({
        limit: 1024 * 4,
        include: /\.(pdf|jpg|jpeg|png|webm|mp4|svg|ttf|woff|woff2)$/,
      }),
      cssInjectedByJsPlugin(),
      externalVue(outputName),
    ],
  }),
)
