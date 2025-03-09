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

**Build library**

```bash
pnpm run build:lib
```

**Run demo**

```bash
# View at http://localhost:2345
pnpm run demo
```

The library must be rebuilt to view changes in the demo. It is possible to set up a file watcher to rebuild, or directly import `Optimizer` (instead of the built package) in the app for live reloading.

## NPM

**Install**

```bash
npm install --save @samatech/image-opt
```

**Usage**

See a full example in `packages/demo/src/App.vue`. Currently only a Vue widget is provided, and the library API is not optimal. The non-Vue parts will eventually be extracted into a framework-agnostic library (https://github.com/sampullman/image-opt/issues/9), and better styling and customization options will be provided (https://github.com/sampullman/image-opt/issues/10).

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
const HOST = 'http://localhost:2345'
</script>
```

## License

MIT License © 2025 [Sam Pullman](https://github.com/sampullman)
