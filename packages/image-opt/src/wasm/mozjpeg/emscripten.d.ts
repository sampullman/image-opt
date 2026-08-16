// Minimal description of the Emscripten runtime that `mozjpeg_enc.js` exposes.
// Only the parts this project touches are declared; extend it rather than
// widening anything to `any` if more of the runtime is needed.
declare namespace EmscriptenWasm {
  interface Module {
    locateFile?: (path: string, scriptDirectory: string) => string;
    onAbort?: (what: string) => void;
    print?: (text: string) => void;
    printErr?: (text: string) => void;
  }

  // Built with `-s EXPORT_ES6=1`, whose factory takes the WASM location as a
  // second argument instead of resolving it relative to the script.
  type ModuleFactory<T extends Module = Module> = (
    moduleOverrides?: Partial<T>,
    binaryFile?: string | URL
  ) => Promise<T>;
}
