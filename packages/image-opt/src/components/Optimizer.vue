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
  saveImage,
  OutputType,
  outputTypeToAssetType,
} from '../util'
import { optimizeInitWrap, optimizeImage, getDefaultOptions } from '../optimize'
import UploadFile from './UploadFile.vue'
import { Optimizer, WasmInitOptions } from '../optimize/optimize-options'
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

const setImagePreview = (file: File) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    assetBase64.value = reader.result?.toString() ?? ''
  }
}

const getOptimizer = (contentType: AssetContentType) => {
  const overrideType = outputTypeToAssetType(optionsStore.outputType.value, contentType)
  if (overrideType === AssetContentType.Jpeg) {
    return optionsStore.jpeg.value.optimizer
  } else {
    return Optimizer.Oxipng
  }
}

const optimizeFile = async (file: File) => {
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
  await optimizeInitWrap({
    ...wasmInit(),
    assetType: validFile.type,
    optimizer: getOptimizer(validFile.type),
  })
  await confirmOptimize(validFile)
}

const selectFiles = async (files: File[] | null | undefined) => {
  if (files) {
    try {
      setImagePreview(files[0])
      loading.value = true
      for (const file of files) {
        await optimizeFile(file)
      }
    } catch (e) {
      console.log('Optimize error', e)
      const key = (e as IValidateMediaError).fileErrors[0]
      error.value = key
    } finally {
      loading.value = false
    }
  }
}

const removeImage = (index: number) => {
  images.value.splice(index, 1)
}

const confirmOptimize = async (file: ValidatedFile) => {
  if (!error.value && file) {
    try {
      const imageOptions = {
        ...getDefaultOptions(file.type),
        ...getImageOptions(file.type),
      }
      const result = await optimizeImage(
        file,
        workerUrl.value,
        wasmInit(),
        getOptimizer(file.type),
        imageOptions,
      )
      if (result) {
        const image: IListImage = {
          file,
          result,
        }
        if (optionsStore.immediateDownload.value) {
          saveImage(image, optionsStore.outputType.value)
        }
        images.value.push(image)
      } else {
        error.value = 'Failed to optimize'
      }
    } catch (e) {
      console.log('Optimize error:', e)
    }
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
