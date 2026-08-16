#!/bin/bash

set -e

vite build
vite build --config vite-worker.config.ts
vue-tsc -p tsconfig.build.json

# tsc does not re-emit declaration files it read as input, and the emitted types
# import the mozjpeg encoder options from its generated glue by relative path.
mkdir -p dist/types/wasm/mozjpeg
cp src/wasm/mozjpeg/mozjpeg_enc.d.ts dist/types/wasm/mozjpeg/
cp src/wasm/mozjpeg/emscripten.d.ts dist/types/wasm/mozjpeg/

# The WASM binaries are loaded from a URL supplied by the consumer at runtime,
# so nothing imports them and the bundler never sees them. They are published
# through the package's `exports` map, which reads them from `dist`.
cp src/wasm/jpegli/jpegli.wasm dist/
cp src/wasm/mozjpeg/mozjpeg_enc.wasm dist/
cp src/wasm/oxipng/image_opt_bg.wasm dist/
