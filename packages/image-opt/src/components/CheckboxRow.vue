<template>
  <div
    class="row checkbox-row"
    role="checkbox"
    tabindex="0"
    :aria-checked="checked"
    @click="emit('toggle')"
    @keydown.enter.prevent="emit('toggle')"
    @keydown.space.prevent="emit('toggle')"
  >
    <div class="text">{{ label }}</div>
    <OCheckbox :checked="checked" />
  </div>
</template>

<script lang="ts" setup>
import OCheckbox from './OCheckbox.vue'

defineProps<{
  label: string
  checked: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<style lang="postcss" scoped>
.checkbox-row {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  border-radius: 2px;
  &:focus-visible {
    outline: 2px solid #5d99b6;
    outline-offset: 2px;
  }
}
.text {
  font-size: 15px;
  max-width: 230px;
  text-align: left;
  color: #434448;
}
</style>
