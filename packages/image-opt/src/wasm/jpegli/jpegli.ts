// Hand-written loader for jpegli.wasm, in the shape wasm-bindgen generates.
// The exported signatures below match the module's real arities; verify with
// `WebAssembly.instantiate(...).instance.exports.<name>.length` after a rebuild.
export interface JpegliModule {
  readonly memory: WebAssembly.Memory;
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
    dctMethod: number
  ) => number;
  readonly malloc: (size: number) => number;
  readonly free: (ptr: number) => void;
}

let wasm: JpegliModule;

const cachedTextDecoder =
  typeof TextDecoder !== "undefined"
    ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })
    : {
        decode: (_input?: BufferSource): string => {
          throw Error("TextDecoder not available");
        },
      };

if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder.decode();
}

let cachedUint8Memory0: Uint8Array | null = null;

function getUint8Memory0(): Uint8Array {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr: number, len: number): string {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

export function encode(
  data: Uint8Array,
  width: number,
  height: number,
  colorspace: number,
  quality: number,
  progressiveLevel: number,
  optimizeCoding: number,
  adaptiveQuantization: number,
  standardQuantTables: number,
  fancyDownsampling: number,
  dctMethod: number
): Uint8Array {
  const inBuf = wasm.malloc(data.length);
  const mem = wasm.memory;
  new Uint8Array(mem.buffer).set(data, inBuf);
  const size = wasm.malloc(8);

  const result = wasm.encode(
    inBuf,
    width,
    height,
    colorspace,
    2, // YCbCrSubsampleRatio420
    size,
    quality,
    progressiveLevel,
    optimizeCoding,
    adaptiveQuantization,
    standardQuantTables,
    fancyDownsampling,
    dctMethod
  );
  const b = new Uint32Array(mem.buffer.slice(size, size + 8));
  const img = new Uint8Array(mem.buffer.slice(result, result + b[0]));
  wasm.free(inBuf);
  wasm.free(size);
  wasm.free(result);
  return img;
}

interface WasmLoadResult {
  instance: WebAssembly.Instance;
  module: WebAssembly.Module;
}

async function __wbg_load(
  module: Response | WebAssembly.Module,
  imports: WebAssembly.Imports
): Promise<WasmLoadResult> {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming`:\n", e);
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}

function __wbg_get_imports(): WebAssembly.Imports {
  return {
    env: {
      memory: new WebAssembly.Memory({
        initial: 256,
        maximum: 10000 /* 1e4 */,
        shared: true,
      }),
    },
    wasi: {},
    wasi_snapshot_preview1: {
      // TODO -- these stubs are imported in jpegli.wasm, but shouldn't be necessary
      // Ideally jpegli could be recompiled without them.
      fd_prestat_get(_fd: number, _buf: number) {
        return 8;
      },
      fd_close(_fd: number) {
        return 8;
      },
      fd_seek(_fd: number, _offset: number, _whence: number, _newOffset: number) {
        return 8;
      },
      fd_write(_fd: number, _iovs: number, _iovsLen: number, _written: number) {
        return 8;
      },
      proc_exit(code: number): never {
        throw new Error(`jpegli exited with code ${code}`);
      },
    },
    wbg: {
      __wbindgen_throw(arg0: number, arg1: number): never {
        throw new Error(getStringFromWasm0(arg0, arg1));
      },
    },
  };
}

function __wbg_finalize_init(instance: WebAssembly.Instance): JpegliModule {
  wasm = instance.exports as unknown as JpegliModule;
  cachedUint8Memory0 = null;

  return wasm;
}

export async function init(input: RequestInfo | URL): Promise<JpegliModule> {
  if (wasm !== undefined) return wasm;
  const imports = __wbg_get_imports();

  const data = await fetch(input);

  const { instance } = await __wbg_load(data, imports);

  return __wbg_finalize_init(instance);
}
