<template>
  <div class="optimizer">
    <div class="opt-wrap">
      <UploadFile
        title="Select PNG/JPEG"
        subtitle="Drag or click here"
        accept="image/png,image/jpeg"
        :preview="assetBase64"
        @fileSelect="updateAsset"
      />
    </div>
    <div v-if="error" class="error">
      {{ getError(error) }}
    </div>
    <OButton
      v-if="!optionsStore.immediateDownload.value"
      text="Optimize"
      :animate="loading"
      :disabled="!validatedFile?.file"
      @click="confirmOptimize"
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
  saveFile,
  AssetContentType,
} from '../util'
import { optimizeInitWrap, optimizeImage, getDefaultOptions } from '../optimize'
import UploadFile from './UploadFile.vue'
import OButton from './OButton.vue'
import { Optimizer, WasmInitOptions } from '../optimize/optimize-options'
import EncodeOptions from './EncodeOptions.vue'
import { getImageOptions, optionsStore } from '../store'

const error = ref()
const assetBase64 = ref('')
const loading = ref(false)
const validatedFile = ref<ValidatedFile | undefined>()

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

const handleImageSelect = (validFile: ValidatedFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(validFile.file)
  reader.onload = () => {
    assetBase64.value = reader.result?.toString() ?? ''
  }
  validatedFile.value = validFile
}

const getOptimizer = (contentType: AssetContentType) => {
  if (contentType === AssetContentType.Jpeg) {
    return optionsStore.jpeg.value.optimizer
  } else {
    return Optimizer.Oxipng
  }
}

const updateAsset = async (file: File | null | undefined) => {
  if (file) {
    validatedFile.value = undefined
    error.value = undefined
    try {
      const validFile = await validateMedia(
        { size: 10000000, types: CONTENT_TYPES },
        file,
      )
      handleImageSelect(validFile)
      loading.value = true
      await optimizeInitWrap({
        ...wasmInit(),
        assetType: validFile.type,
        optimizer: getOptimizer(validFile.type),
      })
      loading.value = false
      if (optionsStore.immediateDownload.value) {
        confirmOptimize()
      }
    } catch (e) {
      console.log(e)
      const key = (e as IValidateMediaError).fileErrors[0]
      error.value = key
    }
  }
}

const confirmOptimize = async () => {
  const file = validatedFile.value
  if (!loading.value && !error.value && file) {
    loading.value = true
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
        saveFile(file.file.name || 'opt.png', result, file.type)
      } else {
        error.value = ''
      }
    } catch (e) {
      console.log('Optimize error:', e)
    }
    loading.value = false
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
}
.opt-wrap {
  width: 480px;
  max-width: 95%;
}
</style>
