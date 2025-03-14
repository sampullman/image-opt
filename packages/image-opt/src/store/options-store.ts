import { LocalStoragePlugin, useModule } from '@samatech/vue-store'
import { Optimizer } from '../optimize/optimize-options'
import { AssetContentType, OutputType } from '../util'

export interface IPngOptions {
  level: number
  interlace: boolean
}

export interface IJpegOptions {
  quality: number
  optimizer: Optimizer
  mozProgressive: boolean
  jpegliProgressive: number
}

export type FileType = 'jpeg' | 'png'

export interface IOptionsState {
  immediateDownload: boolean
  outputType: OutputType
  selectedType: FileType
  zip: boolean
  png: IPngOptions
  jpeg: IJpegOptions
}

export const getImageOptions = (assetType: AssetContentType) => {
  if (assetType === AssetContentType.Jpeg) {
    const jpeg = optionsStore.jpeg.value
    if (jpeg.optimizer === Optimizer.Jpegli) {
      return {
        quality: jpeg.quality,
        progressive: jpeg.jpegliProgressive,
      }
    } else {
      return {
        quality: jpeg.quality,
        progressive: jpeg.mozProgressive,
      }
    }
  } else {
    return {
      ...optionsStore.png.value,
    }
  }
}

const getters = (_state: IOptionsState) => ({})

const mutations = (state: IOptionsState) => ({
  toggleImmediate() {
    state.immediateDownload = !state.immediateDownload
  },
  setType(selectedType: FileType) {
    state.selectedType = selectedType
  },
  setOutputType(outputType: OutputType) {
    state.outputType = outputType
  },
  setQuality(quality: number) {
    state.jpeg.quality = quality
  },
  setJpegOptimizer(optimizer: Optimizer) {
    state.jpeg.optimizer = optimizer
  },
  setLevel(level: number) {
    state.png.level = level
  },
})

export const optionsStore = useModule<
  IOptionsState,
  ReturnType<typeof getters>,
  ReturnType<typeof mutations>
>({
  name: 'options-store',
  version: 7,
  stateInit: () => ({
    immediateDownload: true,
    outputType: OutputType.MatchInput,
    zip: false,
    selectedType: 'jpeg',
    png: {
      level: 4,
      interlace: false,
    },
    jpeg: {
      quality: 75,
      optimizer: Optimizer.Jpegli,
      mozProgressive: true,
      jpegliProgressive: 2,
    },
  }),
  getters,
  mutations,
  plugins: [LocalStoragePlugin],
})
