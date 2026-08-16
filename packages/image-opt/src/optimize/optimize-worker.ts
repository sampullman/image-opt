import { WorkerCommand, WorkerResultType } from './worker-enum'
import { encodeImage, optimizeInitWrap } from './optimize-wrap'

self.onmessage = async (e: MessageEvent<WorkerCommand>) => {
  const { file, init, options } = (e.data ?? {}) as WorkerCommand
  if (!file) {
    return
  }
  try {
    await optimizeInitWrap(init)
    const output = encodeImage(init.optimizer, file, options ?? {})
    self.postMessage({ type: WorkerResultType.Complete, output })
  } catch (e) {
    self.postMessage({
      type: WorkerResultType.Error,
      output: e instanceof Error ? e.message : String(e),
    })
  }
}
