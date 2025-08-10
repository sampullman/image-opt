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
  progressiveLevel: number
  optimizeCoding: number
  adaptiveQuantization: number
  standardQuantTables: number
  fancyDownsampling: number
  dctMethod: number
}

export type FileType = 'jpeg' | 'png'

export interface IOptionsState {
  immediateDownload: boolean
  keepImageData: boolean
  outputType: OutputType
  selectedType: FileType
  zip: boolean
  poolSize: number
  png: IPngOptions
  jpeg: IJpegOptions
}

export const getImageOptions = (assetType: AssetContentType) => {
  if (assetType === AssetContentType.Jpeg) {
    const jpeg = optionsStore.jpeg.value
    if (jpeg.optimizer === Optimizer.Jpegli) {
      return {
        quality: jpeg.quality,
        progressiveLevel: jpeg.progressiveLevel,
        optimizeCoding: jpeg.optimizeCoding,
        adaptiveQuantization: jpeg.adaptiveQuantization,
        standardQuantTables: jpeg.standardQuantTables,
        fancyDownsampling: jpeg.fancyDownsampling,
        dctMethod: jpeg.dctMethod,
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
  toggleKeepImageData() {
    state.keepImageData = !state.keepImageData
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
  setPoolSize(size: number) {
    state.poolSize = size
  },
  setJpegliProgressiveLevel(level: number) {
    state.jpeg.progressiveLevel = level
  },
  toggleJpegliOptimizeCoding() {
    state.jpeg.optimizeCoding = state.jpeg.optimizeCoding ? 0 : 1
  },
  toggleJpegliAdaptiveQuantization() {
    state.jpeg.adaptiveQuantization = state.jpeg.adaptiveQuantization ? 0 : 1
  },
  toggleJpegliStandardQuantTables() {
    state.jpeg.standardQuantTables = state.jpeg.standardQuantTables ? 0 : 1
  },
  toggleJpegliFancyDownsampling() {
    state.jpeg.fancyDownsampling = state.jpeg.fancyDownsampling ? 0 : 1
  },
  setJpegliDctMethod(method: number) {
    state.jpeg.dctMethod = method
  },
})

export const optionsStore = useModule<
  IOptionsState,
  ReturnType<typeof getters>,
  ReturnType<typeof mutations>
>({
  name: 'options-store',
  version: 10,
  stateInit: () => ({
    immediateDownload: true,
    keepImageData: true,
    outputType: OutputType.MatchInput,
    zip: false,
    selectedType: 'jpeg',
    poolSize: navigator.hardwareConcurrency || 4,
    png: {
      level: 4,
      interlace: false,
    },
    jpeg: {
      quality: 75,
      optimizer: Optimizer.Jpegli,
      mozProgressive: true,
      progressiveLevel: 2,
      optimizeCoding: 1,
      adaptiveQuantization: 1,
      standardQuantTables: 0,
      fancyDownsampling: 1,
      dctMethod: 0,
    },
  }),
  getters,
  mutations,
  plugins: [LocalStoragePlugin],
})
