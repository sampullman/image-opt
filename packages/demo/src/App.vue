<template>
  <div class="image-opt-demo">
    <div></div>
    <div class="content-wrap">
      <div class="optimize-wrap">
        <h1>Image Optimizer</h1>
        <div class="subtitle">
          Images are optimized in your browser, and never sent to a server.<br />
          Supports Jpeg and Png
        </div>
        <Optimizer
          :mozjpegWasm="HOST + MozjpegWasm"
          :oxipngWasm="HOST + OxipngWasm"
          :jpegliWasm="HOST + JpegliWasm"
          :workerUrl="HOST + OptimizeWorker"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Optimizer } from '@samatech/image-opt'
import JpegliWasm from '@samatech/image-opt/jpegli.wasm?url'
import MozjpegWasm from '@samatech/image-opt/mozjpeg.wasm?url'
import OxipngWasm from '@samatech/image-opt/oxipng.wasm?url'
import OptimizeWorker from '@samatech/image-opt/worker?url'

// Must prefix URLs in dev
const HOST = 'http://localhost:2345'

// Use direct import for live reload in dev
// import OptimizeWorker from '/node_modules/@samatech/image-opt/src/optimize/optimize-worker.ts?url'
</script>

<style lang="postcss">
@import './mixins.postcss';

html,
body {
  font-family: $font-text;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: $grey-100;
  color: #1a1a1a;
  * {
    box-sizing: border-box;
  }
}

h1 {
  @mixin title 32px;
  margin: 16px 0;
}

p {
  margin: 0;
}

a {
  text-decoration: none;
  color: unset;
}

.noscroll {
  overflow: hidden;
}

.image-opt-demo {
  @mixin flex-col;
  height: 100%;
  overflow-y: auto;
}

.content-wrap {
  @mixin flex-center-col;
  max-width: 900px;
  margin: 0 auto;
  min-height: 100vh;
}
.optimize-wrap {
  text-align: center;
  margin: auto 0;
  padding: 48px 0;
}
.subtitle {
  margin-bottom: 16px;
  line-height: 1.5em;
  color: #434448;
}

@media (max-width: 640px) {
}
</style>
