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
  readonly malloc: (a: number, b: number) => number;
  readonly free: (a: number, b: number, c: number) => void;
}

let wasm: JpegliModule;

const cachedTextDecoder =
  typeof TextDecoder !== "undefined"
    ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })
    : {
        decode: () => {
          throw Error("TextDecoder not available");
        },
      };

if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder.decode();
}

let cachedUint8Memory0: Uint8Array | null = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
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
) {
  const inBuf = wasm.malloc(data.length);
  const mem = wasm.memory;
  new Uint8Array(mem.buffer).set(data, inBuf);
  let size = wasm.malloc(8);

  const result = wasm.encode(
    inBuf,
    width,
    height,
    2,
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
  let b = new Uint32Array(mem.buffer.slice(size, size + 8));
  console.log(size, b, result);
  const img = new Uint8Array(mem.buffer.slice(result, result + b[0]));
  wasm.free(inBuf);
  wasm.free(size);
  wasm.free(result);
  return img;
}

async function __wbg_load(module, imports) {
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

function __wbg_get_imports() {
  const imports = {
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
      fd_prestat_get(e, t) {
        return 8;
      },
      fd_close(e) {
        return 8;
      },
      fd_seek(e, t, l, n) {
        return 8;
      },
      fd_write(e, t, l, n) {
        return 8;
      },
      proc_exit(e) {
        throw new i(e);
      },
    },
  };
  imports.wbg = {};
  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };

  return imports;
}

function __wbg_finalize_init(instance, module) {
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  cachedUint8Memory0 = null;

  return wasm;
}

export async function init(input) {
  if (wasm !== undefined) return wasm;
  const imports = __wbg_get_imports();

  const data = await fetch(input);

  const { instance, module } = await __wbg_load(data, imports);

  return __wbg_finalize_init(instance, module);
}
