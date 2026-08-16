#!/bin/sh -e
# The Makefile runs inside the container against a bind mount of this directory,
# so it can only write here. Copy the results into the library afterwards.
OUT_DIR=../../packages/image-opt/src/wasm/mozjpeg

docker build -t squoosh-cpp - < ./Dockerfile
docker run -it --rm -v $PWD:/src squoosh-cpp "$@"

cp enc/mozjpeg_enc.js enc/mozjpeg_enc.wasm "$OUT_DIR/"
