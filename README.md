<h2 align='center'>Image Optimizer</h2>

<p align='center'>Library and widget for optimizing images in the browser using WASM and web workers.</p>

<br>

## Demo

Test the widget at [image.samatech.tw](https://image.samatech.tw)

### Development

**Install packages**

```
pnpm i
```

**Build library**

```bash
pnpm run build:lib
```

**Run demo**

```bash
# View at http://localhost:2345
pnpm run demo
```

The library must be rebuilt to view changes in the demo. It is possible to set up a file watcher to rebuild, or directly import `Optimizer` (instead of the built package) in the app for live reloading.

## NPM

TODO - include WASM in library build.

## License

MIT License © 2025 [Sam Pullman](https://github.com/sampullman)
