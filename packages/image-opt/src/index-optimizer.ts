import './optimize/optimize-worker?worker'
import { Optimizer } from './components'

// The export build is loaded by a page that picks the widget up off `window`.
// A `declare global` naming the component makes its import alias circular.
;(window as unknown as { Optimizer: typeof Optimizer }).Optimizer = Optimizer

export { Optimizer }
