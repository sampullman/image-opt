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
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { STMultiselect, STProgressBar } from '@samatech/vue-components'
import { FileType, optionsStore } from '../store'
import { Optimizer, OutputType } from '../optimize/optimize-options'
import OCheckbox from './OCheckbox.vue'

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
</style>
