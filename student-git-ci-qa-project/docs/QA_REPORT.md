# QA Report

## Project
**StudyScore — Git, CI and QA Learning Project**

## Unit Tests

The project includes automated unit tests for the core grade-calculation logic.

Covered behaviors:

1. Correct average calculation for valid numeric scores.
2. Acceptance of numeric strings submitted from the HTML form.
3. Rejection of empty score lists.
4. Rejection of invalid scores outside the 0–100 range.
5. Correct mapping of averages to A–F letter grades.
6. Correct performance-message selection.

Tests use Node.js's built-in `node:test` module and strict assertions.

Run locally with:

```bash
npm test
```

## Linting

ESLint is configured with the recommended JavaScript rules plus:

- strict equality (`eqeqeq`);
- mandatory curly braces;
- unused-variable checks.

Run:

```bash
npm run lint
```

During development, the linter is intended to catch problems before code reaches the main branch. The final source is structured to pass the configured rules.

## CI Quality Gate

The GitHub Actions workflow executes on pushes and pull requests. It performs:

1. dependency installation;
2. linting;
3. unit tests;
4. production build.

A failure in any step causes the CI job to fail, giving immediate feedback to contributors.

## Code Review Summary

The intended collaboration workflow uses feature branches and pull requests. A reviewer checks:

- clarity of variable and function names;
- correctness of the grade logic;
- validation and error handling;
- unit-test coverage;
- consistent formatting and lint status.

Suggested review outcome: approve only after CI is green and all comments are resolved.
