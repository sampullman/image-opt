import { IOptimizeSpec } from './optimize-request'
import { WorkerCommand, WorkerResultType } from './worker-enum'
import { encodeImage, optimizeInitWrap } from './optimize-wrap'

self.onmessage = async (e: MessageEvent<WorkerCommand>) => {
  const command = e.data
  try {
    if (!command?.file || !command.optimizer) {
      // The pool waits for a message, so answer even this
      throw new Error('Malformed optimize command')
    }
    // Restores the pairing the structured clone erased
    const spec = {
      optimizer: command.optimizer,
      options: command.options,
    } as IOptimizeSpec
    await optimizeInitWrap(command.optimizer, command.init ?? {})
    const output = encodeImage(spec, command.file)
    self.postMessage({ type: WorkerResultType.Complete, output })
  } catch (e) {
    self.postMessage({
      type: WorkerResultType.Error,
      output: e instanceof Error ? e.message : String(e),
    })
  }
}
