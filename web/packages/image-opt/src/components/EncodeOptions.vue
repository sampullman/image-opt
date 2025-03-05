<template>
  <div class="encode-options">
    <div class="label">Image Options</div>
    <div class="row file-type-wrap">
      <div class="text">Set options for each file type.</div>
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
      <div class="text">Chose an optimizer (Jpegli recommended)</div>
      <STMultiselect
        :value="optionsStore.jpeg.value.optimizer"
        :options="[Optimizer.Jpegli, Optimizer.Mozjpeg]"
        :clearable="false"
        class="optimizer select"
        @select="optionsStore.setJpegOptimizer($event as Optimizer)"
      />
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
    <div class="row">
      <div class="text">Optimize and download immediately.</div>
      <OCheckbox
        :item="{
          checked: optionsStore.immediateDownload.value,
        }"
        @checked="optionsStore.setImmediate($event)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { STMultiselect, STProgressBar } from '@samatech/vue-components'
import { FileType, optionsStore } from '../store'
import { Optimizer } from '../optimize/optimize-options'
import OCheckbox from './OCheckbox.vue'

const types: FileType[] = ['jpeg', 'png']

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
</script>

<style lang="postcss" scoped>
$grey1: #4c566a;

.encode-options {
  margin-top: 32px;
  min-width: 340px;
}
.label {
  font-weight: bold;
  font-size: 20px;
}
.text {
  font-size: 16px;
  max-width: 230px;
  text-align: left;
}
.row {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select {
  width: 100px;
}
.quality {
  margin-top: 48px;
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
</style>
