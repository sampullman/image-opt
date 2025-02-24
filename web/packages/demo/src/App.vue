<template>
  <div class="image-opt-demo">
    <div></div>
    <div class="content-wrap">
      <div class="optimize-wrap">
        <h1>Optimizer Web Demo</h1>
        <Optimizer
          :mozjpegWasm="mozjpegWasm"
          :oxipngWasm="oxipngWasm"
          :jpegliWasm="jpegliWasm"
          :workerUrl="OptimizeWorker.toString()"
        />
      </div>
      <div class="footer">© SamaTech 2024. All rights reserved.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Optimizer, OptimizeWorker } from '@samatech/image-opt'

// import OptimizeWorker from '/node_modules/@samatech/image-opt/src/optimize/optimize-worker.ts?url'

const mozjpegWasm = new URL(
  '../../../../mozjpeg/enc/mozjpeg_enc.wasm',
  import.meta.url,
).toString()
const oxipngWasm = new URL(
  '../../../../oxipng/pkg/image_opt_bg.wasm',
  import.meta.url,
).toString()
const jpegliWasm = new URL('../../../../jpegli/jpegli.wasm', import.meta.url).toString()
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
  color: $color-primary;
  * {
    box-sizing: border-box;
  }
}

h1 {
  @mixin title 32px;
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
}

.footer {
  @mixin caption 10px 16px;
  padding: 12px 0 8px;
  margin-top: auto;
}

@media (max-width: 640px) {
}
</style>
