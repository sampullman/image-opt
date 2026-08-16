<template>
  <span class="checkmark" :class="{ checked, disabled }" />
</template>

<script lang="ts" setup>
// Presentational only. The surrounding row owns the state and the interaction,
// so this never mutates or emits.
defineProps<{
  checked?: boolean
  disabled?: boolean
}>()
</script>

<style lang="postcss" scoped>
.checkmark {
  height: 16px;
  width: 16px;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid grey;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  &.checked {
    background-color: darkblue;
    border: 1px solid transparent;

    &::after {
      content: '';
      display: block;
      width: 3px;
      height: 6px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: translate(0, -1px) rotate(45deg);
    }
  }

  &.disabled {
    opacity: 0.5;
  }
}
</style>
