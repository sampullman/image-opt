#!/bin/bash

set -e

# Builds straight into the library, which vendors the generated glue and WASM.
OUT_DIR="../../packages/image-opt/src/wasm/oxipng"

export CFLAGS="${CFLAGS} -DUNALIGNED_ACCESS_IS_FAST=1"
wasm-pack build -t web -d "${OUT_DIR}"
# RUSTFLAGS='-C target-feature=+atomics,+bulk-memory' wasm-pack build -t web -d "${OUT_DIR}" -- -Z build-std=panic_abort,std --features=parallel

# wasm-pack writes an npm manifest and an ignore file for a standalone package;
# neither applies when the output is vendored into another package's source.
rm -f "${OUT_DIR}/.gitignore" "${OUT_DIR}/package.json"
