<h2 align='center'>Image Optimizer</h2>

<p align='center'>Library and Vue widget for optimizing images in the browser using WASM and web workers.</p>

<br>

## Demo

Test the widget at [image.samatech.tw](https://image.samatech.tw)

### Development

**Install packages**

```
pnpm i
```

The WASM encoders are vendored into `packages/image-opt/src/wasm`, so building the library needs no Rust or Emscripten toolchain. See `optimizers/README.md` to rebuild them.

**Build library**

```bash
pnpm run build:lib
```

**Run demo**

```bash
# View at http://127.0.0.1:3050
pnpm run demo
```

The library must be rebuilt to view changes in the demo. It is possible to set up a file watcher to rebuild, or directly import `Optimizer` (instead of the built package) in the app for live reloading.

**Typecheck**

```bash
pnpm run typecheck
```

The demo is checked against the library's generated declarations, so a widget API change that the demo does not follow fails here.

**End-to-end tests**

```bash
pnpm run test:e2e
```

Playwright drives the demo through the real WASM encoders. See `packages/demo-e2e/README.md`.

## NPM

**Install**

```bash
npm install --save @samatech/image-opt
```

**Usage**

See a full example in `packages/demo/src/App.vue`. Currently only a Vue widget is provided, and the library API is not optimal. The non-Vue parts will eventually be extracted into a framework-agnostic library (https://github.com/sampullman/image-opt/issues/9), and better styling and customization options will be provided (https://github.com/sampullman/image-opt/issues/10).

TypeScript declarations are generated from source and published with the package, so no hand-written types are needed to consume it.

This assumes Vite is used as the bundler.

```Vue
<template>
  <Optimizer
    :mozjpegWasm="HOST + MozjpegWasm"
    :oxipngWasm="HOST + OxipngWasm"
    :jpegliWasm="HOST + JpegliWasm"
    :workerUrl="HOST + OptimizeWorker"
  />
</template>

<script setup lang="ts">
import { Optimizer } from '@samatech/image-opt'
import JpegliWasm from '@samatech/image-opt/jpegli.wasm?url'
import MozjpegWasm from '@samatech/image-opt/mozjpeg.wasm?url'
import OxipngWasm from '@samatech/image-opt/oxipng.wasm?url'
import OptimizeWorker from '@samatech/image-opt/worker?url'

// Must prefix URLs in dev
const HOST = 'http://127.0.0.1:3050'
</script>
```

## License

MIT License © 2025 [Sam Pullman](https://github.com/sampullman)
