import { defineConfig } from 'vite'
import { libConfig } from './vite-lib-base'

export default defineConfig(
  libConfig({
    entry: './src/optimize/optimize-worker.ts',
    outDir: './dist',
    // Adds the worker bundle to what the package build already emitted
    emptyOutDir: false,
  }),
)
