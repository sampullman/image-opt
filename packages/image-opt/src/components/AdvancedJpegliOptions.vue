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
    <CheckboxRow
      label="Optimize Coding"
      :checked="optionsStore.jpeg.value.optimizeCoding === 1"
      @toggle="optionsStore.toggleJpegliOptimizeCoding()"
    />
    <CheckboxRow
      label="Adaptive Quantization"
      :checked="optionsStore.jpeg.value.adaptiveQuantization === 1"
      @toggle="optionsStore.toggleJpegliAdaptiveQuantization()"
    />
    <CheckboxRow
      label="Standard Quant Tables"
      :checked="optionsStore.jpeg.value.standardQuantTables === 1"
      @toggle="optionsStore.toggleJpegliStandardQuantTables()"
    />
    <CheckboxRow
      label="Fancy Downsampling"
      :checked="optionsStore.jpeg.value.fancyDownsampling === 1"
      @toggle="optionsStore.toggleJpegliFancyDownsampling()"
    />
    <div class="row chroma-wrap">
      <div class="text">Chroma Subsampling</div>
      <STMultiselect
        :value="chromaSubsampling"
        :options="chromaOptions"
        :clearable="false"
        class="chroma"
        @select="selectChroma($event?.value as string)"
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
import { STMultiselect, STProgressBar } from '@samatech/vue-components'
import { JpegliChroma } from '../optimize/jpegli'
import { optionsStore } from '../store'
import CheckboxRow from './CheckboxRow.vue'

const progressiveLevel = computed(() => optionsStore.jpeg.value.progressiveLevel)

// The multiselect works in strings, so the enum value travels as its digits.
const chromaOptions = [
  { label: '4:2:0 (smallest)', value: String(JpegliChroma.YCbCr420) },
  { label: '4:2:2', value: String(JpegliChroma.YCbCr422) },
  { label: '4:4:0', value: String(JpegliChroma.YCbCr440) },
  { label: '4:4:4 (sharpest color)', value: String(JpegliChroma.YCbCr444) },
]

const chromaSubsampling = computed(() =>
  String(optionsStore.jpeg.value.chromaSubsampling),
)

const selectChroma = (value: string | undefined) => {
  if (value !== undefined) {
    optionsStore.setJpegliChromaSubsampling(Number(value) as JpegliChroma)
  }
}
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
.chroma-wrap {
  margin-top: 16px;
}
.chroma {
  width: 170px;
}
.advanced-options-content {
  margin-top: 48px;
  padding-left: 12px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
