#!/bin/bash

set -e
cd "$(dirname "$0")"

# jpegli has no source build here: the encoder is taken from gen2brain/jpegli,
# which builds libjxl's jpegli plus a small C shim (`lib/jpegli.c`) with wasi-sdk
# and publishes the result. Its `lib/Makefile` is the recipe; this script fetches
# what that Makefile produced, checks it still matches the loader, and vendors it.
#
# Pass a commit, tag or branch to move to a different upstream build.
REV="${1:-e70416fde048654832b086c18c7ead646e0109c6}"
URL="https://raw.githubusercontent.com/gen2brain/jpegli/${REV}/lib/jpegli.wasm.gz"
OUT_DIR="../../packages/image-opt/src/wasm/jpegli"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "Fetching ${URL}"
curl -sSfL "$URL" -o "$WORK/jpegli.wasm.gz"
gunzip -c "$WORK/jpegli.wasm.gz" > "$WORK/jpegli.wasm"

# The loader is hand-written against this ABI, so a build that changed it would
# fail at runtime with nothing to point at. Refuse it here instead.
node --input-type=module - "$WORK/jpegli.wasm" <<'EOF'
import { readFileSync } from 'node:fs'

const expected = { _initialize: 0, encode: 13, decode: 14, malloc: 1, free: 1 }
const imports = ['fd_close', 'fd_seek', 'fd_write', 'proc_exit']

const module = new WebAssembly.Module(readFileSync(process.argv[2]))

const wrong = WebAssembly.Module.imports(module).filter(
  (i) => i.module !== 'wasi_snapshot_preview1' || !imports.includes(i.name),
)
if (wrong.length) {
  throw new Error(
    `unexpected imports: ${wrong.map((i) => `${i.module}.${i.name}`).join(', ')}`,
  )
}

const { exports } = new WebAssembly.Instance(module, {
  wasi_snapshot_preview1: Object.fromEntries(imports.map((name) => [name, () => 0])),
})
if (!(exports.memory instanceof WebAssembly.Memory)) {
  throw new Error('the module no longer exports its own memory')
}
for (const [name, arity] of Object.entries(expected)) {
  if (typeof exports[name] !== 'function') {
    throw new Error(`missing export: ${name}`)
  }
  if (exports[name].length !== arity) {
    throw new Error(`${name} takes ${exports[name].length} arguments, expected ${arity}`)
  }
}
console.log('ABI matches jpegli.ts')
EOF

cp "$WORK/jpegli.wasm" "$OUT_DIR/jpegli.wasm"
echo "Wrote ${OUT_DIR}/jpegli.wasm"
