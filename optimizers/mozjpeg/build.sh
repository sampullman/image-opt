#!/bin/sh -e
docker build -t squoosh-cpp - < ./Dockerfile
docker run -it --rm -v $PWD:/src squoosh-cpp "$@"