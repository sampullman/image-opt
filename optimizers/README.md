# optimizers

Build inputs for the WASM encoders. The build **outputs** -- the JS glue, its
declarations, and the `.wasm` binaries -- are vendored into
`packages/image-opt/src/wasm/` and committed there, so the library builds
without a Rust or Emscripten toolchain.

| Encoder | Source                       | Vendored output                            |
| ------- | ---------------------------- | ------------------------------------------ |
| oxipng  | `oxipng/` (Rust, wasm-pack)  | `packages/image-opt/src/wasm/oxipng/`      |
| mozjpeg | `mozjpeg/` (C++, Emscripten) | `packages/image-opt/src/wasm/mozjpeg/`     |
| jpegli  | `jpegli/` (upstream binary)  | `packages/image-opt/src/wasm/jpegli/`      |

## Rebuilding

Each build script writes into the library, so commit both this directory and
`packages/image-opt/src/wasm/` together.

```bash
# oxipng -- needs rust + wasm-pack
cd oxipng && ./build.sh

# mozjpeg -- needs docker
cd mozjpeg && ./build.sh

# jpegli -- needs curl + node
./jpegli/build.sh
```

`mozjpeg_enc.d.ts`, `emscripten.d.ts` and `mozjpeg-color-space.ts` are
hand-written descriptions of the Emscripten output and are **not** regenerated;
they live with the vendored output and must be updated if the encoder's
signature changes.

## jpegli

There is no source build here. `jpegli.wasm` comes from
[gen2brain/jpegli](https://github.com/gen2brain/jpegli), which compiles
[google/jpegli](https://github.com/google/jpegli) and a small C shim
(`lib/jpegli.c`, the source of the `encode` signature) with wasi-sdk in reactor
mode, and commits the result as `lib/jpegli.wasm.gz`. Building it from source
needs `/opt/wasi-sdk` and takes the better part of an hour; upstream's
`lib/Makefile` is the recipe if that is ever wanted.

`jpegli/build.sh` fetches that binary at a pinned revision, checks its ABI, and
vendors it. Pass a commit, tag or branch to move to a newer upstream build --
and update the default in the script when you do:

```bash
./jpegli/build.sh                # the pinned revision
./jpegli/build.sh main           # whatever upstream has now
```

The loader, `packages/image-opt/src/wasm/jpegli/jpegli.ts`, is hand-written
rather than generated: the module carries its own memory and imports only four
WASI calls, so there is no glue to go with it. Its declared signatures have to
match the module's real arities, which is what the build script's ABI check
covers.
