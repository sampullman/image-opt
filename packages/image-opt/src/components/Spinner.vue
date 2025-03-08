<template>
  <div ref="wrapper" class="o-spinner">
    <span class="dot" />
    <span class="dot" />
    <span class="dot" />
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'

export interface ISpinner {
  wrapper: Ref<HTMLDivElement | undefined>
}

withDefaults(
  defineProps<{
    size?: number
    color?: string
  }>(),
  {
    size: 10,
    color: '#fff',
  },
)

const wrapper = ref<HTMLDivElement>()

// expose the root element of spinner for ImageLoader
defineExpose<ISpinner>({ wrapper })
</script>

<style lang="postcss">
.o-spinner {
  display: inline-flex;
  align-items: center;
  .dot {
    width: v-bind(size + 'px');
    height: v-bind(size + 'px');
    border-radius: 50%;
    background-color: v-bind(color);
    animation: scale 0.6s ease alternate infinite;
    &:not(:first-child) {
      margin-left: calc(v-bind(size + 'px') / 4);
    }
    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }
    &:nth-of-type(3) {
      animation-delay: 0.4s;
    }
  }
  @keyframes scale {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
