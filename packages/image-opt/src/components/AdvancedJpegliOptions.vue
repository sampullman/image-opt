<template>
  <div class="advanced-options-content">
    <STProgressBar
      id="progressive"
      :value="progressiveLevel"
      :min="0"
      :max="2"
      :show-percent="false"
      :height="5"
      class="quality"
      @change="optionsStore.setJpegliProgressiveLevel"
    >
      <template #label> Progressive Level </template>
    </STProgressBar>
    <div class="row" @click="optionsStore.toggleJpegliOptimizeCoding()">
      <div class="text">Optimize Coding</div>
      <OCheckbox
        :item="{
          checked: optionsStore.jpeg.value.optimizeCoding === 1,
        }"
      />
    </div>
    <div class="row" @click="optionsStore.toggleJpegliAdaptiveQuantization()">
      <div class="text">Adaptive Quantization</div>
      <OCheckbox
        :item="{
          checked: optionsStore.jpeg.value.adaptiveQuantization === 1,
        }"
      />
    </div>
    <div class="row" @click="optionsStore.toggleJpegliStandardQuantTables()">
      <div class="text">Standard Quant Tables</div>
      <OCheckbox
        :item="{
          checked: optionsStore.jpeg.value.standardQuantTables === 1,
        }"
      />
    </div>
    <div class="row" @click="optionsStore.toggleJpegliFancyDownsampling()">
      <div class="text">Fancy Downsampling</div>
      <OCheckbox
        :item="{
          checked: optionsStore.jpeg.value.fancyDownsampling === 1,
        }"
      />
    </div>
    <div class="row">
      <div class="text">
        DCT Method: <span>{{ optionsStore.jpeg.value.dctMethod }}</span>
      </div>
      <input
        type="number"
        class="pool-size"
        :value="optionsStore.jpeg.value.dctMethod"
        min="0"
        max="2"
        @change="
          optionsStore.setJpegliDctMethod(
            Number(($event.target as HTMLInputElement).value),
          )
        "
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { STProgressBar } from '@samatech/vue-components'
import { optionsStore } from '../store'
import OCheckbox from './OCheckbox.vue'

const progressiveLevel = computed(() => optionsStore.jpeg.value.progressiveLevel)
</script>

<style lang="postcss" scoped>
$grey1: #4c566a;

.text {
  font-size: 15px;
  max-width: 230px;
  text-align: left;
  color: #434448;
}
.row {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.quality {
  margin-top: 24px;
}
:deep(.st-progressbar) {
  .min,
  .max {
    color: $grey1;
  }
}
.pool-size {
  width: 60px;
}
.advanced-options-content {
  margin-top: 48px;
  padding-left: 12px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
