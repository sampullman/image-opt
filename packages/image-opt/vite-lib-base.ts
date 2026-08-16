import Vue from '@vitejs/plugin-vue'
import path from 'path'
import { PluginOption, UserConfig } from 'vite'

const resolve = (p: string): string => path.resolve(__dirname, p)

export interface ILibBuildOptions {
  // Entry module, relative to this package
  entry: string
  outDir: string
  // Off for a build that adds to what an earlier one produced
  emptyOutDir?: boolean
  // Set to emit a single named bundle instead of one file per entry
  fileName?: string
  plugins?: PluginOption[]
}

// Shared by the package build, the worker build and the standalone export
// build, which differ only in their entry, output and extra plugins.
export const libConfig = (options: ILibBuildOptions): UserConfig => {
  const { entry, outDir, emptyOutDir = true, fileName, plugins = [] } = options
  return {
    assetsInclude: /\.(pdf|jpg|png|webm|mp4|svg|wasm)$/,
    plugins: [Vue(), ...plugins],
    worker: {
      format: 'es',
    },
    build: {
      outDir,
      emptyOutDir,
      sourcemap: true,
      minify: 'terser',
      lib: {
        formats: ['es'],
        entry: [resolve(entry)],
        name: '@samatech/image-opt',
        ...(fileName ? { fileName: () => fileName } : {}),
      },
      rollupOptions: {
        // Supplied by the consumer, as a peer dependency
        external: ['vue'],
        output: fileName
          ? { format: 'es', dir: outDir }
          : { entryFileNames: '[name].js' },
      },
    },
  }
}
