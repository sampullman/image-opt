<template>
  <div class="optimizer">
    <div class="opt-wrap">
      <UploadFile
        title="Select PNG/JPEG"
        subtitle="Drag or click here"
        accept="image/png,image/jpeg"
        :preview="assetBase64"
        @fileSelect="selectFiles"
      />
      <div v-if="loading" class="load-wrap">
        <Spinner :size="24" color="#5d99b6" />
      </div>
    </div>
    <div v-if="error" class="error">
      {{ getError(error) }}
    </div>
    <ImageList
      v-if="images.length"
      :images="images"
      class="list"
      @download="saveImage($event, optionsStore.outputType.value)"
      @remove="removeImage"
      @reorder="reorderImage"
      @clear="images = []"
    />
    <EncodeOptions />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import {
  validateMedia,
  IValidateMediaError,
  ValidatedFile,
  CONTENT_TYPES,
  AssetContentType,
  convertJpegToPngFile,
  IListImage,
  moveImage,
  nextImageId,
  releaseImageData,
  saveImage,
  OutputType,
  outputTypeToAssetType,
} from '../util'
import {
  getDefaultOptions,
  optimizeImages,
  optimizerForType,
  OptimizerType,
  WasmInitOptions,
} from '../optimize'
import UploadFile from './UploadFile.vue'
import EncodeOptions from './EncodeOptions.vue'
import { getImageOptions, optionsStore } from '../store'
import ImageList from './ImageList.vue'
import Spinner from './Spinner.vue'

const error = ref()
const assetBase64 = ref('')
const loading = ref(false)
const images = ref<IListImage[]>([])

const props = defineProps<{
  mozjpegWasm: string
  oxipngWasm: string
  jpegliWasm: string
  workerUrl: string
}>()
const { jpegliWasm, mozjpegWasm, oxipngWasm, workerUrl } = toRefs(props)

const wasmInit = (): WasmInitOptions => {
  return {
    mozjpegWasm: mozjpegWasm.value,
    oxipngWasm: oxipngWasm.value,
    jpegliWasm: jpegliWasm.value,
  }
}

const ErrorMap: Record<string, string> = {
  FILE_TYPE: 'Unsupported file type',
  unknown: 'Unknown error occurred',
}

const getError = (key: string): string => {
  return ErrorMap[key] ?? ErrorMap.unknown
}

// Validation rejects with a list of keys; anything else (a missing WASM binary,
// a worker that failed to start) has no key and reads as an unknown error.
const getErrorKey = (e: unknown): string => {
  const fileErrors = (e as IValidateMediaError | undefined)?.fileErrors
  return Array.isArray(fileErrors) ? fileErrors[0] : 'unknown'
}

const setImagePreview = (file: File) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    assetBase64.value = reader.result?.toString() ?? ''
  }
}

// The optimizer that produces the configured output format for an input format
const getOptimizer = (contentType: AssetContentType): OptimizerType => {
  const outputType = outputTypeToAssetType(optionsStore.outputType.value, contentType)
  return optimizerForType(outputType, optionsStore.jpeg.value.optimizer)
}

const prepareFiles = async (files: File[]): Promise<ValidatedFile[]> => {
  return Promise.all(
    files.map(async (file) => {
      // Hack to avoid Oxipng crash on JPG file input
      let fileHack = file
      if (
        file.type === AssetContentType.Jpeg &&
        optionsStore.outputType.value === OutputType.Png
      ) {
        fileHack = await convertJpegToPngFile(file)
      }
      const validFile = await validateMedia(
        { size: 50000000, types: CONTENT_TYPES },
        fileHack,
      )
      // Set original size since PNG conversion changes the file
      validFile.originalSize = file.size
      return validFile
    }),
  )
}

const selectFiles = async (files: File[] | null | undefined) => {
  error.value = undefined
  if (!files?.length) {
    return
  }
  loading.value = true
  try {
    setImagePreview(files[0])
    // Awaited, so the spinner covers the encode and not just the decode
    await optimizeFiles(await prepareFiles(files))
  } catch (e) {
    console.error('Optimize error', e)
    error.value = getErrorKey(e)
  } finally {
    loading.value = false
  }
}

const removeImage = (index: number) => {
  images.value.splice(index, 1)
}

const reorderImage = (from: number, to: number) => {
  images.value = moveImage(images.value, from, to)
}

const optimizeFiles = async (files: ValidatedFile[]) => {
  if (!files.length) {
    return
  }
  const request = files.map((file) => {
    const optimizer = getOptimizer(file.type)
    return {
      file,
      optimizer,
      options: {
        ...getDefaultOptions(optimizer),
        ...getImageOptions(optimizer),
      },
    }
  })
  const results = await optimizeImages(
    request,
    workerUrl.value,
    wasmInit(),
    optionsStore.poolSize.value,
  )
  for (const result of results) {
    const image: IListImage = {
      id: nextImageId(),
      file: result.file,
      result: result.data ?? new Uint8Array(),
      resultSize: result.data?.length ?? 0,
      error: result.error,
    }
    // A failed image still gets a row, so it is not silently missing
    if (!result.error) {
      if (optionsStore.immediateDownload.value) {
        saveImage(image, optionsStore.outputType.value)
      }
      if (!optionsStore.keepImageData.value) {
        releaseImageData(image)
      }
    }
    images.value.push(image)
  }
}
</script>

<style lang="postcss">
@import '@samatech/vue-components/dist/style.css';

.optimizer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 480px;
}
.st-multiselect {
  border-radius: 2px;
  width: 120px;
}
.error {
  font-size: 14px;
  margin-top: 8px;
  color: #d53434;
}

.opt-wrap {
  width: 100%;
  background: rgba(0, 0, 0, 0.03);
  position: relative;
}
.load-wrap {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
}
.list {
  margin-top: 16px;
}
</style>
