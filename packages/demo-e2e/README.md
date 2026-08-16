# demo-e2e

End-to-end tests for the demo app, which exercise the `@samatech/image-opt`
widget the way a user does: real files, real WASM encoders, real web workers.

## Running

```bash
# From the repository root
pnpm run test:e2e
```

Playwright starts its own server: it builds the library and runs the demo on
`http://127.0.0.1:3050`. A demo server already running on that port is reused
outside CI, in which case the library is **not** rebuilt -- run
`pnpm run build:lib` after changing library source.

Browsers are installed with:

```bash
pnpm --filter image-opt-demo-e2e exec playwright install chromium
```

Useful flags:

```bash
pnpm --filter image-opt-demo-e2e run test:ui        # interactive runner
pnpm --filter image-opt-demo-e2e run test:headed    # watch a real browser
pnpm --filter image-opt-demo-e2e run report         # last HTML report
```

## Layout

| Path                        | Contents                                                    |
| --------------------------- | ----------------------------------------------------------- |
| `tests/optimizer-page.ts`   | Page object and helpers shared by every spec                 |
| `tests/demo.spec.ts`        | The page renders and the upload control works                |
| `tests/optimize.spec.ts`    | Optimizing PNG and JPEG files, and rejecting anything else   |
| `tests/image-list.spec.ts`  | Removing, clearing and downloading list entries              |
| `tests/reorder.spec.ts`     | Reordering by drag and by keyboard                           |
| `tests/options.spec.ts`     | The encode options panel                                     |
| `tests/output-type.spec.ts` | Format conversion, checked against the downloaded bytes      |
| `tests/failure.spec.ts`     | Images that fail to encode, by making the WASM fetch 404     |

## Options

Tests seed the widget's persisted options with `seedOptions` rather than
clicking through the panel, so each test starts from a known state. See the
note on its `__version` handling -- nested state such as `jpeg` must be passed
complete, which `jpegOptions()` does.

## Fixtures

The images in `fixtures/` are committed so a test run needs nothing but the
repository. Regenerate them with:

```bash
pnpm --filter image-opt-demo-e2e run fixtures
```
