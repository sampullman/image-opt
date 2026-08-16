<template>
  <div class="image-list">
    <div class="row header">
      <div class="handle" />
      <div class="name">Name</div>
      <div class="before">Before</div>
      <div class="after">After</div>
      <div class="saved">Saved</div>
      <div class="actions" @click="emit('clear')">Clear All</div>
    </div>
    <div v-if="!images.length" class="empty">No images</div>
    <div
      v-for="(image, index) in images"
      :key="image.id"
      class="row image"
      :class="{
        dragging: dragIndex === index,
        'drag-over': dropIndex === index,
        failed: !!image.error,
      }"
      draggable="true"
      @dragstart="dragStart(index, $event)"
      @dragover.prevent="dropIndex = index"
      @dragleave="dragLeave(index)"
      @drop.prevent="drop(index)"
      @dragend="dragReset"
    >
      <div class="handle">
        <button
          :ref="(el) => setHandle(image.id, el)"
          type="button"
          class="grip"
          :aria-label="`Reorder ${image.file.file.name}`"
          @keydown.up.prevent="moveByKey(index, -1)"
          @keydown.down.prevent="moveByKey(index, 1)"
        >
          <Grip class="grip-icon" />
        </button>
      </div>
      <div class="name">
        <div class="file-name">{{ image.file.file.name }}</div>
        <!-- The column is narrow, so keep the full message reachable on hover -->
        <div v-if="image.error" class="row-error" :title="image.error">
          {{ image.error }}
        </div>
      </div>
      <div class="before">{{ toSize(image.file.originalSize) }}</div>
      <div class="after">{{ image.error ? '—' : toSize(image.resultSize) }}</div>
      <div class="saved">{{ image.error ? '—' : savings(image) }}</div>
      <div class="actions">
        <Download
          class="download icon"
          :class="{ disabled: !image.result.length }"
          @click="download(image)"
        />
        <Trash class="trash icon" @click="emit('remove', index)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { IListImage } from '../util'
import Download from './Download.vue'
import Grip from './Grip.vue'
import Trash from './Trash.vue'

const props = defineProps<{
  images: IListImage[]
}>()

const emit = defineEmits<{
  (e: 'clear'): void
  (e: 'remove', index: number): void
  (e: 'reorder', from: number, to: number): void
  (e: 'download', image: IListImage): void
}>()

const dragIndex = ref<number>()
const dropIndex = ref<number>()
const handles = new Map<string, HTMLElement>()

const setHandle = (id: string, el: unknown) => {
  if (el instanceof HTMLElement) {
    handles.set(id, el)
  } else {
    handles.delete(id)
  }
}

// Chrome blurs an element when it is moved in the DOM, which would drop focus
// after every keypress. Put it back so the same image can be moved repeatedly.
const moveByKey = async (index: number, offset: number) => {
  const { id } = props.images[index]
  emit('reorder', index, index + offset)
  await nextTick()
  handles.get(id)?.focus()
}

const dragStart = (index: number, event: DragEvent) => {
  dragIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    // Firefox ignores drags that carry no data
    event.dataTransfer.setData('text/plain', String(index))
  }
}

const dragLeave = (index: number) => {
  if (dropIndex.value === index) {
    dropIndex.value = undefined
  }
}

const drop = (index: number) => {
  const from = dragIndex.value
  dragReset()
  if (from !== undefined) {
    emit('reorder', from, index)
  }
}

const dragReset = () => {
  dragIndex.value = undefined
  dropIndex.value = undefined
}

const download = (image: IListImage) => {
  if (image.result.length) {
    emit('download', image)
  }
}

const savings = (image: IListImage): string => {
  // Compare against the size shown in the "Before" column. `file.file.size` is
  // the converted file when the output type forces a format change, so it would
  // measure the saving against a number the user never sees.
  const sizeBefore = image.file.originalSize
  if (!sizeBefore) {
    return '?'
  }
  const saved = (sizeBefore - image.resultSize) / sizeBefore
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
.handle {
  width: 6%;
  display: flex;
  align-items: center;
}
.grip {
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  border-radius: 2px;
  background: none;
  cursor: grab;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.7;
  }
  &:focus-visible {
    outline: 2px solid #5d99b6;
    outline-offset: 1px;
  }
}
.grip-icon {
  width: 18px;
  height: 18px;
  pointer-events: none;
}
.name {
  width: 37%;
  overflow: hidden;
  text-align: left;
  padding-right: 8px;
}
.file-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.row-error {
  font-size: 11px;
  line-height: 14px;
  color: #d53434;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  &:hover {
    opacity: 0.4;
  }
}
.image {
  border-top: 2px solid transparent;
}
.failed .before,
.failed .after,
.failed .saved {
  color: #9a9ca0;
}
.dragging {
  opacity: 0.4;
}
.drag-over:not(.dragging) {
  border-top-color: #5d99b6;
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
