import { ValidatedFile } from '../util'
import { Optimizer, WasmInitOptions } from './optimize-options'
import { optimizeImageWrap } from './optimize-wrap'
import { WorkerResult, WorkerResultType, WorkerCommand } from './worker-enum'

// Avoids CORS issue, see https://github.com/vitejs/vite/issues/13680
const workerHack = (url: string) => {
  console.log('WORKER', url)
  const js = `import ${JSON.stringify(new URL(url))}`
  const blob = new Blob([js], { type: 'application/javascript' })

  const objURL = URL.createObjectURL(blob)
  const worker = new Worker(objURL, { type: 'module', name: 'optimize-worker' })
  worker.addEventListener('error', (e) => {
    URL.revokeObjectURL(objURL)
  })
  return worker
}

// Optimizes an image using web workers, if available
export const optimizeImage = async (
  file: ValidatedFile,
  workerUrl: string | undefined,
  wasmInit: WasmInitOptions,
  optimizer: Optimizer,
  options: Record<string, unknown>,
): Promise<Uint8Array | undefined> => {
  const buffer = await file.file.arrayBuffer()
  if (workerUrl && window.Worker) {
    return new Promise((resolve, reject) => {
      const worker = workerHack(workerUrl)
      worker.onmessage = (e: MessageEvent<WorkerResult>) => {
        switch (e.data.type) {
          case WorkerResultType.Complete:
            resolve(e.data.output as Uint8Array)
            break
          default:
            reject(e.data.output || 'Worker failed to optimize')
        }
      }
      const opt = { ...options }
      const command: WorkerCommand = {
        init: {
          ...wasmInit,
          assetType: file.type,
          optimizer,
        },
        file: {
          buffer,
          data: file.data,
        },
        options: opt,
      }
      worker.postMessage(command)
    })
  } else {
    return optimizeImageWrap(file, file.type, options)
  }
}
