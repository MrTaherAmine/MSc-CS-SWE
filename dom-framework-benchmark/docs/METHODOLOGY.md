# Benchmark Methodology

## Environment

Record before running:

- Operating system
- CPU
- RAM
- Browser and version
- Framework version
- Build mode

## Procedure

For each framework:

1. Install dependencies.
2. Create a production build.
3. Serve the production build locally.
4. Open it in the same Chromium/Chrome browser.
5. Close DevTools.
6. Click **Run benchmark**.
7. Download the JSON result.
8. Place it in `results/raw/`.

Suggested file names:

```text
results/raw/react-results.json
results/raw/angular-results.json
results/raw/vue-results.json
results/raw/svelte-results.json
```

Then run:

```bash
node scripts/merge-results.mjs
```

## Why Median?

Each operation runs five samples and reports the median. Median timing is less sensitive to one-off operating-system scheduling or garbage-collection spikes than a single observation.

## Memory

The benchmark reads `performance.memory.usedJSHeapSize` when available. This API is primarily exposed by Chromium-derived browsers and should be treated as an approximate comparison rather than a complete memory profile.

For a deeper memory investigation, use Chrome DevTools Performance and Memory panels after completing the timing benchmark.
