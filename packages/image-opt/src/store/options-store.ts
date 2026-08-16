import { IPlugin, LocalStoragePlugin, useModule } from '@samatech/vue-store'
import { defaultJpegliOptions, IJpegliOptions, JpegliChroma } from '../optimize/jpegli'
import { OptimizerType } from '../optimize/optimize-options'
import { IOptimizeSpec } from '../optimize/optimize-request'
import { IOxipngOptions } from '../optimize/oxipng'
import { OutputType } from '../util'

export interface IPngOptions extends IOxipngOptions {
  level: number
  interlace: boolean
}

// Every JPEG setting the UI offers, across both encoders. `getImageOptions`
// narrows it to what the selected encoder actually reads.
export interface IJpegOptions extends IJpegliOptions {
  optimizer: OptimizerType
  mozProgressive: boolean
}

export type FileType = 'jpeg' | 'png'

export interface IOptionsState {
  immediateDownload: boolean
  keepImageData: boolean
  outputType: OutputType
  selectedType: FileType
  poolSize: number
  png: IPngOptions
  jpeg: IJpegOptions
}

// The stored settings an optimizer understands. Keyed on the optimizer rather
// than the input format, because the output format may differ from the input.
export const getImageOptions = (optimizer: OptimizerType): IOptimizeSpec => {
  const jpeg = optionsStore.jpeg.value
  switch (optimizer) {
    case OptimizerType.Jpegli:
      return {
        optimizer,
        options: {
          quality: jpeg.quality,
          chromaSubsampling: jpeg.chromaSubsampling,
          progressiveLevel: jpeg.progressiveLevel,
          optimizeCoding: jpeg.optimizeCoding,
          adaptiveQuantization: jpeg.adaptiveQuantization,
          standardQuantTables: jpeg.standardQuantTables,
          fancyDownsampling: jpeg.fancyDownsampling,
          dctMethod: jpeg.dctMethod,
        },
      }
    case OptimizerType.Mozjpeg:
      return {
        optimizer,
        options: {
          quality: jpeg.quality,
          progressive: jpeg.mozProgressive,
        },
      }
    case OptimizerType.Oxipng:
      return { optimizer, options: { ...optionsStore.png.value } }
  }
}

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
  setJpegOptimizer(optimizer: OptimizerType) {
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
  setJpegliChromaSubsampling(chroma: JpegliChroma) {
    state.jpeg.chromaSubsampling = chroma
  },
})

const defaultState = (): IOptionsState => ({
  immediateDownload: true,
  keepImageData: true,
  outputType: OutputType.MatchInput,
  selectedType: 'jpeg',
  poolSize: navigator.hardwareConcurrency || 4,
  png: {
    level: 4,
    interlace: false,
  },
  jpeg: {
    ...defaultJpegliOptions,
    optimizer: OptimizerType.Jpegli,
    mozProgressive: true,
  },
})

/**
 * Fills in nested state the stored copy predates. `LocalStoragePlugin` migrates
 * by top-level key, so a whole `jpeg` object saved before an option existed is
 * carried over without it, and the widget would read that option as undefined.
 * Runs after that plugin, on what it restored.
 */
const fillNestedDefaults: IPlugin<IOptionsState> = {
  onStateInit: (state) => {
    const defaults = defaultState()
    return {
      ...state,
      png: { ...defaults.png, ...state.png },
      jpeg: { ...defaults.jpeg, ...state.jpeg },
    }
  },
}

export const optionsStore = useModule<
  IOptionsState,
  Record<string, never>,
  ReturnType<typeof mutations>
>({
  name: 'options-store',
  version: 11,
  stateInit: defaultState,
  mutations,
  plugins: [LocalStoragePlugin, fillNestedDefaults],
})
