# optimizers

Build inputs for the WASM encoders. The build **outputs** -- the JS glue, its
declarations, and the `.wasm` binaries -- are vendored into
`packages/image-opt/src/wasm/` and committed there, so the library builds
without a Rust or Emscripten toolchain.

| Encoder | Source                       | Vendored output                            |
| ------- | ---------------------------- | ------------------------------------------ |
| oxipng  | `oxipng/` (Rust, wasm-pack)  | `packages/image-opt/src/wasm/oxipng/`      |
| mozjpeg | `mozjpeg/` (C++, Emscripten) | `packages/image-opt/src/wasm/mozjpeg/`     |
| jpegli  | -- (see below)               | `packages/image-opt/src/wasm/jpegli/`      |

## Rebuilding

Each build script writes into the library, so commit both this directory and
`packages/image-opt/src/wasm/` together.

```bash
# oxipng -- needs rust + wasm-pack
cd oxipng && ./build.sh

# mozjpeg -- needs docker
cd mozjpeg && ./build.sh
```

`mozjpeg_enc.d.ts`, `emscripten.d.ts` and `mozjpeg-color-space.ts` are
hand-written descriptions of the Emscripten output and are **not** regenerated;
they live with the vendored output and must be updated if the encoder's
signature changes.

## jpegli

`jpegli.wasm` is prebuilt and has no build script here. Its loader,
`packages/image-opt/src/wasm/jpegli/jpegli.ts`, is hand-written in the shape
wasm-bindgen generates. The exported signatures it declares must match the
module's real arities -- check them after replacing the binary:

```js
const { instance } = await WebAssembly.instantiate(bytes, imports)
Object.entries(instance.exports).map(([k, v]) => [k, v.length])
```
