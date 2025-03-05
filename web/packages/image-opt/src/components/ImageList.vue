<template>
  <div class="image-list">
    <div class="row header">
      <div class="name">Name</div>
      <div class="before">Before</div>
      <div class="after">After</div>
      <div class="saved">Saved</div>
      <div class="actions" @click="emit('clear')">Clear All</div>
    </div>
    <div v-if="!images.length" class="empty">No images</div>
    <div v-for="(image, index) in images" class="row image">
      <div class="name">
        {{ image.file.file.name }}
      </div>
      <div class="before">{{ toSize(image.file.originalSize) }}</div>
      <div class="after">{{ toSize(image.result.length) }}</div>
      <div class="saved">{{ savings(image) }}</div>
      <div class="actions">
        <Download class="download icon" @click="emit('download', image)" />
        <Trash class="trash icon" @click="emit('remove', index)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Download from './Download.vue'
import { IListImage } from './i-list-image'
import Trash from './Trash.vue'

defineProps<{
  images: IListImage[]
}>()

const emit = defineEmits<{
  (e: 'clear'): void
  (e: 'remove', index: number): void
  (e: 'download', image: IListImage): void
}>()

const savings = (image: IListImage): string => {
  const { file, result } = image
  const sizeBefore = file.file.size
  if (sizeBefore === 0) {
    return '?'
  }
  const saved = (sizeBefore - result.length) / sizeBefore
  return `${Math.round(saved * 100)}%`
}

const toSize = (size: number): string => {
  if (size > 1000000) {
    return `${Math.round(size / 100000) / 10} MB`
  } else if (size > 1000) {
    return `${Math.round(size / 100) / 10} KB`
  }
  return `${size} B`
}
</script>

<style lang="postcss" scoped>
.image-list {
  padding: 12px 16px 8px;
  width: 100%;
  max-width: 100%;
  box-shadow: 0px 3px 15px 2px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}
.row {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  font-size: 13px;
  padding: 6px 8px;
}
.name {
  width: 43%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  padding-right: 8px;
}
.before {
  width: 15%;
}
.after {
  width: 15%;
}
.saved {
  width: 10%;
}
.actions {
  width: 17%;
  user-select: none;
  text-align: right;
}
.empty {
  padding: 12px 0 12px;
  font-size: 15px;
  color: #434448;
}
.trash {
  margin-left: 8px;
}
.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.7;
  }
}
.header {
  font-weight: bold;
  font-size: 13px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  .actions {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    color: #737373;
    cursor: pointer;
  }
}
</style>
