import './optimize/optimize-worker?worker'
import { Optimizer } from './components'

declare global {
  interface Window {
    Optimizer: typeof Optimizer
  }
}

window.Optimizer = Optimizer

export { Optimizer }
