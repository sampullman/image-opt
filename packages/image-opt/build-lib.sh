#!/bin/bash

set -e

vite build
vite build --config vite-worker.config.ts
cp ../../README.md dist/