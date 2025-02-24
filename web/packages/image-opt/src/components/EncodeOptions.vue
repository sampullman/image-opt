<template>
  <div class="encode-options">
    <div class="label">Image Options</div>
    <div class="text">Choose options for each file type.</div>
    <STMultiselect
      :value="optionsStore.selectedType.value"
      :options="types"
      :clearable="false"
      class="link-dropdown"
      @select="selectType($event as FileType)"
    />
    <div class="label">General Options</div>
  </div>
</template>

<script lang="ts" setup>
import { STMultiselect } from '@samatech/vue-components'
import { FileType, optionsStore } from '../store/options-store'

const types: FileType[] = ['jpeg', 'png']

const selectType = (selectedType: FileType) => {
  optionsStore.setType(selectedType)
}
</script>

<style lang="postcss" scoped>
.encode-options {
  margin-top: 32px;
}
.label {
  font-weight: bold;
  font-size: 20px;
}
.text {
  margin-top: 12px;
}
</style>
