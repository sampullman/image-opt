import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

// Vite's dev server serves .wasm as application/octet-stream, which
// `WebAssembly.instantiateStreaming` rejects.
const wasmContentTypePlugin: Plugin = {
  name: 'wasm-content-type-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm')
      }
      next()
    })
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      strict: true,
      // The repository root, so the built library and its WASM resolve
      allow: ['../..'],
    },
    allowedHosts: true,
    port: 3050,
    host: '127.0.0.1',
    // The app builds its WASM and worker URLs from this exact origin, so
    // silently moving to another port would break it
    strictPort: true,
  },
  plugins: [vue(), wasmContentTypePlugin],
})
