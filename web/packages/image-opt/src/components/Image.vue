<template>
  <div class="o-image">
    <img v-if="asImg && url" :src="url" class="o-asset" />
    <div v-else-if="url" :style="{ backgroundImage: `url(${url})` }" class="o-asset" />
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      class="o-image-default"
    >
      <path
        fill="currentColor"
        d="M19 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3Zm0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1Z"
      />
      <path
        fill="currentColor"
        d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 22H6v-6l5-5l5.59 5.59a2 2 0 0 0 2.82 0L21 19l5 5Zm0-4.83l-3.59-3.59a2 2 0 0 0-2.82 0L18 19.17l-5.59-5.59a2 2 0 0 0-2.82 0L6 17.17V6h20Z"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'

const props = withDefaults(
  defineProps<{
    asset?: string | null
    asImg?: boolean
  }>(),
  {
    asset: null,
  },
)
const { asset } = toRefs(props)

const url = computed(() => {
  return asset.value ?? ''
})
</script>

<style lang="postcss" scoped>
.o-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 4px;
  position: relative;
}
.o-asset {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  object-fit: contain;
  object-position: center;
}
.o-default {
  width: 32px;
  height: 32px;
}
</style>
