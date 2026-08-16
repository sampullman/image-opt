// Hand-written loader for jpegli.wasm. Unlike its neighbors, this module has
// no generated glue: it is a plain wasi-sdk reactor build (see
// `optimizers/jpegli`) that brings its own memory and imports nothing but a
// handful of WASI calls, so a few dozen lines of marshalling is all it needs.
//
// The signatures below mirror `encode` in the C shim, and their arities have to
// match the module's real ones. `optimizers/jpegli/build.sh` checks that after
// a rebuild; by hand it is
// `WebAssembly.instantiate(...).instance.exports.<name>.length`.
export interface JpegliModule {
  readonly memory: WebAssembly.Memory
  /** Reactor entry point: runs the static initializers. Called once, by `init`. */
  readonly _initialize: () => void
  readonly encode: (
    inBuf: number,
    width: number,
    height: number,
    colorspace: number,
    chroma: number,
    size: number,
    quality: number,
    progressiveLevel: number,
    optimizeCoding: number,
    adaptiveQuantization: number,
    standardQuantTables: number,
    fancyDownsampling: number,
    dctMethod: number,
  ) => number
  readonly malloc: (size: number) => number
  readonly free: (ptr: number) => void
}

/**
 * `J_COLOR_SPACE`, describing the pixels handed to the encoder. The shim reads
 * `Rgba` -- libjpeg's `JCS_RGB` -- as four bytes per pixel, the layout
 * `ImageData` uses, and converts to YCbCr itself.
 */
export enum JpegliColorSpace {
  Grayscale = 1,
  Rgba = 2,
  YCbCr = 3,
  Cmyk = 4,
}

/**
 * How far the chroma planes are subsampled, in the order the shim declares
 * them. Fewer chroma samples means a smaller file; 4:4:4 keeps every one of
 * them, which color detail (text, line art, saturated edges) needs.
 */
export enum JpegliChroma {
  YCbCr444 = 0,
  YCbCr422 = 1,
  YCbCr420 = 2,
  YCbCr440 = 3,
}

/** Everything `encode` reads besides the pixels and their color space. */
export interface IJpegliEncodeOptions {
  quality: number
  chromaSubsampling: JpegliChroma
  progressiveLevel: number
  optimizeCoding: number
  adaptiveQuantization: number
  standardQuantTables: number
  fancyDownsampling: number
  dctMethod: number
}

let wasm: JpegliModule | undefined

let cachedUint8Memory: Uint8Array | null = null

// `malloc` may grow the memory, which detaches the buffer every view onto it
// was made from. Fetch this after allocating, never before.
const getUint8Memory = (module: JpegliModule): Uint8Array => {
  if (cachedUint8Memory === null || cachedUint8Memory.byteLength === 0) {
    cachedUint8Memory = new Uint8Array(module.memory.buffer)
  }
  return cachedUint8Memory
}

const requireModule = (): JpegliModule => {
  if (!wasm) {
    throw new Error('Jpegli has not been initialized')
  }
  return wasm
}

/**
 * Encodes raw pixels as a JPEG. `data` is read in `colorspace`'s layout, so for
 * `Rgba` it is `width * height * 4` bytes.
 */
export const encode = (
  data: Uint8Array | Uint8ClampedArray,
  width: number,
  height: number,
  colorspace: JpegliColorSpace,
  options: IJpegliEncodeOptions,
): Uint8Array => {
  const module = requireModule()
  const inBuf = module.malloc(data.length)
  if (!inBuf) {
    throw new Error('Jpegli could not allocate memory for the image')
  }
  // `size_t` is four bytes wide in wasm32
  const sizePtr = module.malloc(4)
  if (!sizePtr) {
    module.free(inBuf)
    throw new Error('Jpegli could not allocate memory for the image')
  }
  getUint8Memory(module).set(data, inBuf)

  let out = 0
  try {
    out = module.encode(
      inBuf,
      width,
      height,
      colorspace,
      options.chromaSubsampling,
      sizePtr,
      options.quality,
      options.progressiveLevel,
      options.optimizeCoding,
      options.adaptiveQuantization,
      options.standardQuantTables,
      options.fancyDownsampling,
      options.dctMethod,
    )
    // The encoder answers a null pointer, or a zero length, for input it cannot
    // encode at all -- an unsupported color space, or a failure part way in.
    const size = out ? new Uint32Array(module.memory.buffer, sizePtr, 1)[0] : 0
    if (!size) {
      throw new Error('Jpegli failed to encode the image')
    }
    return new Uint8Array(module.memory.buffer.slice(out, out + size))
  } finally {
    // Nothing here corrupts the allocator, even on the failure path: these
    // three pointers are still whatever `malloc` handed out.
    module.free(inBuf)
    module.free(sizePtr)
    if (out) {
      module.free(out)
    }
  }
}

// jpegli reports fatal errors by writing a message and exiting, and reaches for
// stdio to do it. Nothing here has a file descriptor to write to, so every call
// is refused with EBADF (8) and the exit is turned back into an exception.
const wasiImports = (): WebAssembly.Imports => ({
  wasi_snapshot_preview1: {
    fd_close: (_fd: number) => 8,
    fd_seek: (_fd: number, _offset: number, _whence: number, _newOffset: number) => 8,
    fd_write: (_fd: number, _iovs: number, _iovsLen: number, _written: number) => 8,
    proc_exit: (code: number): never => {
      throw new Error(`Jpegli exited with code ${code}`)
    },
  },
})

const instantiate = async (
  source: Response,
  imports: WebAssembly.Imports,
): Promise<WebAssembly.Instance> => {
  if (typeof WebAssembly.instantiateStreaming === 'function') {
    try {
      return (await WebAssembly.instantiateStreaming(source, imports)).instance
    } catch (e) {
      // A server that answers with the wrong content type is worth working
      // around; anything else is a real failure.
      if (source.headers.get('Content-Type') === 'application/wasm') {
        throw e
      }
      console.warn('`WebAssembly.instantiateStreaming`:\n', e)
    }
  }
  const bytes = await source.arrayBuffer()
  return (await WebAssembly.instantiate(bytes, imports)).instance
}

export const init = async (input: RequestInfo | URL): Promise<JpegliModule> => {
  if (wasm) {
    return wasm
  }
  const instance = await instantiate(await fetch(input), wasiImports())
  const module = instance.exports as unknown as JpegliModule
  module._initialize()
  cachedUint8Memory = null
  wasm = module
  return module
}
