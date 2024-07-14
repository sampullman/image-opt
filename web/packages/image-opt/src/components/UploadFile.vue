<template>
  <div :class="{ 'o-upload-wrap': true, dragging }" :style="{ width, height }">
    <form
      :id="id"
      class="o-upload-form"
      action=""
      enctype="multipart/form-data"
      @drop="dropUploadImage"
      @dragenter="dragStart"
      @dragleave="dragEnd"
      @dragend="dragEnd"
      @input="handleFileSelect"
    >
      <label class="o-upload-area" :for="`image-upload-input${id}`">
        <slot>
          <div v-if="!loading" class="o-upload-button" :class="{ 'has-file': !!preview }">
            <div class="o-upload-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                class="o-upload-image"
              >
                <path
                  fill="currentColor"
                  d="m6 18l1.41 1.41L15 11.83V30h2V11.83l7.59 7.58L26 18L16 8L6 18zM6 8V4h20v4h2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4z"
                />
              </svg>
              <Image v-if="preview" :asset="preview" class="o-upload-background" />
            </div>
            <div class="o-upload-right">
              <div class="o-upload-title">
                {{ title }}
              </div>
              <div class="o-upload-subtitle" v-html="subtitle" />
            </div>
          </div>
        </slot>
        <div v-if="loading" class="o-upload-spinner">
          <Spinner :size="24" color="#3a86ff" />
        </div>
      </label>
      <input
        :id="`o-upload-input${id}`"
        class="o-upload"
        type="file"
        :accept="accept"
        :disabled="isDisabled"
        @click="clickInputFile"
      />
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Spinner from './Spinner.vue'
import Image from './Image.vue'

withDefaults(
  defineProps<{
    id?: string
    title?: string
    subtitle?: string
    isDisabled?: boolean
    preview?: string | null
    loading?: boolean
    accept?: string
    width?: string
    height?: string
  }>(),
  {
    id: '',
    title: undefined,
    subtitle: undefined,
    isDisabled: false,
    preview: null,
    loading: false,
    accept: 'image/*',
    width: '100%',
    height: '182px',
  },
)
const emit = defineEmits<{
  (e: 'file-select', value: File): void
}>()

const dragging = ref(false)
const selectedFile = ref<File>()

const handleFileSelect = (e: InputEvent | Event) => {
  if (e && e.target && e.type === 'input') {
    const files = (e.target as HTMLInputElement).files
    if (files) {
      selectedFile.value = files[0]
      emit('file-select', selectedFile.value)
    }
  } else if (e && e.type === 'drop') {
    const files = (e as InputEvent).dataTransfer?.files
    if (files) {
      selectedFile.value = files[0]
      emit('file-select', selectedFile.value)
    }
  }
  dragging.value = false
}
const dragStart = (e: Event) => {
  e.preventDefault()
  dragging.value = true
}
const dragEnd = (e: Event) => {
  e.preventDefault()
  dragging.value = false
}
const dropUploadImage = (e: Event) => {
  e.preventDefault()
  handleFileSelect(e)
}
const clickInputFile = (e: MouseEvent) => {
  if (e && e.target) {
    ;(e.target as HTMLInputElement).value = ''
  }
}
</script>

<style lang="postcss">
$outline: #bdbfc2;
$blue-500: #3a86ff;

.o-upload-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $outline;
}
.o-upload-form {
  position: relative;
  height: 100%;
  width: 100%;
}
.o-upload-background {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  background-size: contain;
  background-position: center;
  padding: 0;
}
.o-upload {
  cursor: pointer;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.o-upload-button {
  display: flex;
  flex-direction: row;
  color: black;
  text-align: left;
  pointer-events: none;
  font-size: 16px;
  line-height: 22px;
  font-weight: 300;
}
.o-upload-left {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-right: 1px solid $outline;
  position: relative;
}
.o-upload-image {
  position: absolute;
}
.o-upload-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 40px;
  width: 50%;
}
.o-upload-title {
  font-weight: 600;
}
.o-upload-subtitle {
  align-items: center;
  font-size: 10px;
  line-height: 16px;
  font-weight: 300;
  display: inline;
  margin-top: 8px;
  span {
    margin: 0 3px;
    color: $blue-500;
  }
}
&.has-file {
  border: $blue-500;
}
&.dragging {
  border-color: $blue-500;
  .file-upload-left {
    border-color: $blue-500;
  }
}
.o-upload-spinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.o-upload-button,
.o-upload-spinner {
  z-index: 10;
  position: absolute;
  width: 100%;
  height: 100%;
  .loader {
    margin: 0;
  }
  img {
    width: 32px;
    margin-bottom: 6px;
  }
}
</style>
