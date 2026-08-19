# DOM Benchmark: React vs Angular vs Vue vs Svelte

A Master Degree Highlights project comparing DOM manipulation performance across four front-end JavaScript frameworks using the same to-do list workload.

## Deliverables

This repository contains:

- React to-do implementation
- Angular to-do implementation
- Vue to-do implementation
- Svelte to-do implementation
- reproducible benchmark harness
- results table generator
- benchmark methodology
- framework implementation notes
- 200–300 word reflection report

## Required Operations

Every application supports:

- add task;
- view tasks and priority;
- update task;
- remove task.

Every application benchmarks:

- initial render: 100 tasks;
- initial render: 500 tasks;
- initial render: 1000 tasks;
- update 50 tasks;
- delete 50 tasks;
- JavaScript heap usage when available.

## Repository Structure

```text
.
├── react/
├── angular/
├── vue/
├── svelte/
├── shared/
│   ├── benchmark-spec.md
│   └── benchmark-utils.js
├── results/
│   ├── raw/
│   └── BENCHMARK_RESULTS.md
├── scripts/
│   └── merge-results.mjs
└── docs/
    ├── METHODOLOGY.md
    ├── FRAMEWORK_NOTES.md
    └── REFLECTION.md
```

## Run a Framework

Example for React:

```bash
cd react
npm install
npm run build
npm run preview
```

Repeat for `vue` and `svelte`.

Angular:

```bash
cd angular
npm install
npm run build
npx http-server dist/todo-bench/browser
```

Open each application in the same Chromium/Chrome browser and click **Run benchmark**.

## Generate the Final Comparison

Download each app's JSON result and place them under:

```text
results/raw/
```

Then:

```bash
node scripts/merge-results.mjs
```

The generated report will appear at:

```text
results/GENERATED_RESULTS.md
```

## Benchmark Integrity

The repository intentionally does **not** invent timing values. DOM benchmarks are sensitive to browser version, hardware, background load, build mode, and list-keying strategy. The included harness produces project-specific measurements on the machine where the experiment is executed.

For external context, the repository references the independent js-framework-benchmark project, which measures a broader set of DOM operations.

## Author

**Taher Amine ELHOUARI**

Master Degree Highlights — Software Engineering
