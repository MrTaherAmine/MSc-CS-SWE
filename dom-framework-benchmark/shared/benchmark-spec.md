# Benchmark Specification

All four framework implementations use the same workload and measurement rules.

## Operations

1. **Initial Rendering**
   - Render 100 tasks
   - Render 500 tasks
   - Render 1000 tasks

2. **DOM Updates**
   - Start from 1000 tasks
   - Update the first 50 tasks

3. **DOM Deletion**
   - Start from 1000 tasks
   - Delete the first 50 tasks

## Task Shape

Each task contains:

```js
{
  id: number,
  name: string,
  priority: "Low" | "Medium" | "High"
}
```

## Measurement

Each application exposes a **Run benchmark** button.

The benchmark:

- uses `performance.now()` for timing;
- waits for the framework update and at least one browser paint before ending a sample;
- runs each operation multiple times;
- reports median duration in milliseconds;
- records `performance.memory.usedJSHeapSize` when the browser exposes it.

`performance.memory` is Chromium-specific and may be unavailable in other browsers, so memory values can legitimately be `null`.

## Fairness Rules

- Production builds should be benchmarked.
- Browser extensions should be disabled.
- DevTools should be closed while timing.
- The same browser and machine should be used for all four frameworks.
- Each framework uses stable task IDs as keys/tracking identifiers.
- No artificial DOM manipulation outside the framework is used.
