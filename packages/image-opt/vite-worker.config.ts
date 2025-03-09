import Vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

const resolve = (p: string): string => path.resolve(__dirname, p)

export default defineConfig({
  assetsInclude: /\.(pdf|jpg|png|webm|mp4|svg|wasm)$/,
  plugins: [Vue()],
  worker: {
    format: 'es',
  },
  build: {
    outDir: './dist',
    emptyOutDir: false,
    sourcemap: true,
    minify: 'terser',
    lib: {
      formats: ['es'],
      entry: [resolve('./src/optimize/optimize-worker.ts')],
      name: '@samatech/image-opt',
    },
    rollupOptions: {
      // externalize deps that shouldn't be bundled
      external: ['vue'],
      output: {
        entryFileNames: (_entry) => {
          return '[name].js'
        },
      },
    },
  },
})
