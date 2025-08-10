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
      <template #label>
        Progressive Level: <span>{{ progressiveLevel }}</span>
      </template>
    </STProgressBar>
    <div
      class="row immediate"
      @click="
        optionsStore.setJpegliOptimizeCoding(
          optionsStore.jpeg.value.optimizeCoding === 1 ? 0 : 1,
        )
      "
    >
      <div class="text">
        Optimize Coding:
        <span>{{ optionsStore.jpeg.value.optimizeCoding }}</span>
      </div>
      <OCheckbox
        :item="{
          checked: optionsStore.jpeg.value.optimizeCoding === 1,
        }"
      />
    </div>
    <div
      class="row immediate"
      @click="
        optionsStore.setJpegliAdaptiveQuantization(
          optionsStore.jpeg.value.adaptiveQuantization === 1 ? 0 : 1,
        )
      "
    >
      <div class="text">
        Adaptive Quantization:
        <span>{{ optionsStore.jpeg.value.adaptiveQuantization }}</span>
      </div>
      <OCheckbox
        :item="{
          checked: optionsStore.jpeg.value.adaptiveQuantization === 1,
        }"
      />
    </div>
    <div
      class="row immediate"
      @click="
        optionsStore.setJpegliStandardQuantTables(
          optionsStore.jpeg.value.standardQuantTables === 1 ? 0 : 1,
        )
      "
    >
      <div class="text">
        Standard Quant Tables:
        <span>{{ optionsStore.jpeg.value.standardQuantTables }}</span>
      </div>
      <OCheckbox
        :item="{
          checked: optionsStore.jpeg.value.standardQuantTables === 1,
        }"
      />
    </div>
    <div
      class="row immediate"
      @click="
        optionsStore.setJpegliFancyDownsampling(
          optionsStore.jpeg.value.fancyDownsampling === 1 ? 0 : 1,
        )
      "
    >
      <div class="text">
        Fancy Downsampling:
        <span>{{ optionsStore.jpeg.value.fancyDownsampling }}</span>
      </div>
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

const progressiveLevel = computed(
  () => optionsStore.jpeg.value.progressiveLevel,
)
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
.immediate {
  user-select: none;
  cursor: pointer;
}
.pool-size {
  width: 60px;
}
.advanced-options-content {
  margin-top: 12px;
  padding-left: 12px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
