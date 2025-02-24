import { LocalStoragePlugin, useModule } from '@samatech/vue-store'
import { Optimizer } from '../optimize/optimize-options'

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
  selectedType: FileType
  zip: boolean
  png: IPngOptions
  jpeg: IJpegOptions
}

const getters = (state: IOptionsState) => ({})

const mutations = (state: IOptionsState) => ({
  setImediateDownload(immediate: boolean) {
    state.immediateDownload = immediate
  },
  setType(selectedType: FileType) {
    state.selectedType = selectedType
  },
})

export const optionsStore = useModule<
  IOptionsState,
  ReturnType<typeof getters>,
  ReturnType<typeof mutations>
>({
  name: 'options-store',
  version: 5,
  stateInit: () => ({
    immediateDownload: false,
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
