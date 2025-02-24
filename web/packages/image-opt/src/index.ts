export * from './components'
export * from './optimize'
export * from './util'

// import OptimizeWorker from './optimize/optimize-worker?url'
const OptimizeWorker = new URL('./optimize/optimize-worker', import.meta.url).href
console.log('opt1', OptimizeWorker)
export { OptimizeWorker }
