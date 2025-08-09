<template>
  <div class="encode-options">
    <div class="label">Image Options</div>
    <div class="row file-type-wrap">
      <div class="text">Options for file type</div>
      <STMultiselect
        :value="optionsStore.selectedType.value"
        :options="types"
        :clearable="false"
        class="file-type select"
        @select="selectType($event as FileType)"
      />
    </div>
    <div
      v-if="optionsStore.selectedType.value === 'jpeg'"
      class="row jpeg-optimizer-wrap"
    >
      <div class="text">Optimizer (Jpegli recommended)</div>
      <STMultiselect
        :value="optionsStore.jpeg.value.optimizer"
        :options="[Optimizer.Jpegli, Optimizer.Mozjpeg]"
        :clearable="false"
        class="select"
        @select="optionsStore.setJpegOptimizer($event as Optimizer)"
      />
    </div>
    <div
      v-if="
        optionsStore.selectedType.value === 'jpeg' &&
        optionsStore.jpeg.value.optimizer === Optimizer.Jpegli
      "
      class="advanced-options"
    >
      <div class="row immediate" @click="showAdvanced = !showAdvanced">
        <div class="text">Show advanced options</div>
        <OCheckbox
          :item="{
            checked: showAdvanced,
          }"
        />
      </div>
      <div v-if="showAdvanced" class="advanced-options-content">
        <STProgressBar
          id="progressive"
          :value="optionsStore.jpeg.value.progressiveLevel"
          :min="0"
          :max="2"
          :show-percent="false"
          :height="5"
          class="quality"
          @change="optionsStore.setJpegliProgressiveLevel"
        >
          <template #label>Progressive Level</template>
        </STProgressBar>
        <div
          class="row immediate"
          @click="
            optionsStore.setJpegliOptimizeCoding(
              optionsStore.jpeg.value.optimizeCoding === 1 ? 0 : 1,
            )
          "
        >
          <div class="text">Optimize Coding</div>
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
          <div class="text">Adaptive Quantization</div>
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
          <div class="text">Standard Quant Tables</div>
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
          <div class="text">Fancy Downsampling</div>
          <OCheckbox
            :item="{
              checked: optionsStore.jpeg.value.fancyDownsampling === 1,
            }"
          />
        </div>
        <div class="row">
          <div class="text">DCT Method</div>
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
    </div>
    <STProgressBar
      id="quality"
      :value="quality"
      v-bind="progressOptions"
      :height="5"
      class="quality"
      @change="setQuality"
    >
      <template #label> {{ qualityText }}</template>
    </STProgressBar>
    <div class="label general">General Options</div>
    <div class="row immediate" @click="optionsStore.toggleImmediate()">
      <div class="text">Download result immediately</div>
      <OCheckbox
        :item="{
          checked: optionsStore.immediateDownload.value,
        }"
      />
    </div>
    <div class="row immediate" @click="optionsStore.toggleKeepImageData()">
      <div class="text">Keep image data</div>
      <OCheckbox
        :item="{
          checked: optionsStore.keepImageData.value,
        }"
      />
    </div>
    <div class="row file-type-wrap">
      <div class="text">Output file type</div>
      <STMultiselect
        :value="optionsStore.outputType.value"
        :options="outputTypes"
        :clearable="false"
        class="file-type select"
        @select="selectOutputType($event!.value)"
      />
    </div>
    <div class="row">
      <div class="text">Worker pool size</div>
      <input
        type="number"
        class="pool-size"
        :value="optionsStore.poolSize.value"
        min="1"
        :max="maxPoolSize"
        @change="setPoolSize"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { STMultiselect, STProgressBar } from '@samatech/vue-components'
import { FileType, optionsStore } from '../store'
import { Optimizer } from '../optimize/optimize-options'
import { OutputType } from '../util'
import OCheckbox from './OCheckbox.vue'

const showAdvanced = ref(false)
const types: FileType[] = ['jpeg', 'png']
const outputTypes = [
  {
    label: 'Match Input',
    value: OutputType.MatchInput,
  },
  {
    label: 'Jpeg',
    value: OutputType.Jpeg,
  },
  {
    label: 'Png',
    value: OutputType.Png,
  },
]

const progressPng = {
  min: 0,
  max: 6,
  showPercent: false,
}
const progressJpeg = {
  min: 1,
  max: 100,
  showPercent: true,
}
const progressOptions = computed(() => {
  if (optionsStore.selectedType.value === 'jpeg') {
    return progressJpeg
  } else {
    return progressPng
  }
})

const selectType = (selectedType: FileType) => {
  optionsStore.setType(selectedType)
}

const selectOutputType = (outputType: OutputType) => {
  optionsStore.setOutputType(outputType)
}

const qualityText = computed(() => {
  if (optionsStore.selectedType.value === 'jpeg') {
    return 'Quality'
  } else {
    return 'Level'
  }
})

const quality = computed(() => {
  if (optionsStore.selectedType.value === 'jpeg') {
    return optionsStore.jpeg.value.quality
  } else {
    return optionsStore.png.value.level
  }
})

const setQuality = (value: number) => {
  if (optionsStore.selectedType.value === 'jpeg') {
    return optionsStore.setQuality(value)
  } else {
    return optionsStore.setLevel(value)
  }
}

const maxPoolSize = navigator.hardwareConcurrency || 4
const setPoolSize = (event: Event) => {
  const target = event.target as HTMLInputElement
  optionsStore.setPoolSize(Number(target.value))
}
</script>

<style lang="postcss" scoped>
$grey1: #4c566a;

.encode-options {
  margin: 24px 0;
  min-width: 360px;
}
.label {
  font-weight: 500;
  font-size: 17px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
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
  margin-top: 56px;
}
:deep(.st-progressbar) {
  .min,
  .max {
    color: $grey1;
  }
}
#quality {
  :deep(.min) {
    color: $grey1;
  }
  :deep(.max) {
    color: $grey1;
  }
}
.general {
  margin-top: 40px;
}
.immediate {
  user-select: none;
  cursor: pointer;
}
.pool-size {
  width: 60px;
}
.advanced-options {
  margin-top: 12px;
}
.advanced-options-content {
  margin-top: 12px;
  padding-left: 12px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
