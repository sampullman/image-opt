<template>
  <button
    :class="['o-button', disabled && 'disabled']"
    :disabled="disabled"
    @click="click"
  >
    <div v-if="animate" class="o-animate">
      <Spinner class="o-spinner" />
    </div>
    <div v-else>
      {{ text }}
    </div>
    <div v-if="animate" class="o-hidden">
      {{ text }}
    </div>
  </button>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import Spinner from './Spinner.vue'

const emit = defineEmits(['click'])

const props = withDefaults(
  defineProps<{
    text?: string
    disabled?: boolean
    animate?: boolean
  }>(),
  {
    text: '',
    disabled: false,
    animate: false,
  },
)
const { disabled } = toRefs(props)

const click = (e: Event) => {
  if (!disabled.value) {
    emit('click', e)
  }
}
</script>

<style lang="postcss">
$bg-color: #4c566a;

.o-button {
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1.5px;
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  text-align: center;
  border-radius: 2px;
  transition: background-color 0.2s ease;
  min-width: 100px;
  position: relative;
  height: 38px;
  padding: 0 32px;
  background-color: $bg-color;
  color: white;
  &:hover:not(:disabled) {
    background-color: rgba($bg-color, 0.9);
  }
  &:focus:not(:disabled) {
    box-shadow: none;
    background-color: rgba($bg-color, 0.8);
  }
  &.disabled {
    background-color: rgba($bg-color, 0.4);
    color: rgb(220, 220, 220);
    cursor: not-allowed;
    user-select: none;
  }
  .o-hidden {
    visibility: hidden;
  }

  .o-animate {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .o-spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
