# Benchmark Results

## Important Integrity Note

This repository contains a reproducible benchmark implementation for React, Angular, Vue, and Svelte. **Project-specific timing numbers must be generated on the same browser and machine** by running each app's built-in benchmark button.

No fabricated local measurements are included.

## Student Run Table

After running all four applications, copy the generated JSON files into `results/raw/` and run:

```bash
node scripts/merge-results.mjs
```

The script generates a populated comparison table.

| Framework | Render 100 (ms) | Render 500 (ms) | Render 1000 (ms) | Update 50 (ms) | Delete 50 (ms) | Heap after run (MB) |
|---|---:|---:|---:|---:|---:|---:|
| React | pending | pending | pending | pending | pending | pending |
| Angular | pending | pending | pending | pending | pending | pending |
| Vue | pending | pending | pending | pending | pending | pending |
| Svelte | pending | pending | pending | pending | pending | pending |

## External Reference Context

The independent **js-framework-benchmark** measures DOM-heavy operations such as creating 1,000 rows, partial updates, row removal, appending rows, clearing rows, and memory/byte-related metrics. Its official results should be treated as external context rather than as measurements from this repository.

The current benchmark snapshot shows modern implementations of Svelte, Vue, React, and Angular, but performance varies by operation, framework mode, browser release, and benchmark design. This project therefore avoids claiming a universal winner before the local TodoBench workload is executed.

Reference:
- https://github.com/krausest/js-framework-benchmark
- https://krausest.github.io/js-framework-benchmark/index.html
