import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const wasmContentTypePlugin = {
  name: 'wasm-content-type-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm')
      }
      next()
    })
  },
}

export const appConfigServer = {}

export const assetsInclude = /\.(pdf|jpg|png|webm|mp4|svg|wasm)$/

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      strict: true,
      allow: ['../../../'],
    },
    allowedHosts: true,
    port: 3050,
    host: '127.0.0.1',
  },
  plugins: [vue(), wasmContentTypePlugin],
})
