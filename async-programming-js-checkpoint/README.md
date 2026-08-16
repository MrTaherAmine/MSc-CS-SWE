# Checkpoint Asynchronous Programming in JavaScript

Submission for:

**System Design : Asynchronous Programming in JavaScript**

The assignment requires at least three tasks. This submission implements **all five task areas**.

## Topics covered

- async / await
- sequential iteration
- awaiting API-style calls
- error handling with try / catch
- chaining async functions
- concurrent execution with `Promise.all()`
- parallel HTTP requests with `fetch()`

## Implemented Tasks

### Task 01 - `iterateWithAsyncAwait`

Takes an array of values and logs each one with a one-second delay between logs.

```js
await iterateWithAsyncAwait(["A", "B", "C"]);
```

### Task 02 - `awaitCall`

Simulates an API request and waits for its response.

```js
await awaitCall(false);
```

### Task 03 - Error Handling

`awaitCall()` uses `try...catch` and returns a user-friendly error message if the API request fails.

To test failure:

```js
await awaitCall(true);
```

### Chaining Async/Await

`chainedAsyncFunctions()` executes three asynchronous functions sequentially.

```js
await firstAsyncFunction();
await secondAsyncFunction();
await thirdAsyncFunction();
```

Each function waits one second before completing.

### Task 04 - `concurrentRequests`

Runs two asynchronous requests concurrently using:

```js
Promise.all()
```

Both results are logged only after both promises resolve.

### Task 05 - `parallelCalls`

Takes an array of URLs and fetches them concurrently.

Example:

```js
await parallelCalls([
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2"
]);
```

## Sequential vs Concurrent Behavior

### Sequential

```js
await functionOne();
await functionTwo();
```

The second function starts only after the first one completes.

### Concurrent

```js
await Promise.all([
  functionOne(),
  functionTwo()
]);
```

Both operations begin without waiting for the other, and execution continues once both complete.

## Run Locally

Node.js 18+ is recommended because `fetch()` is available globally.

Run:

```bash
npm start
```

or:

```bash
node src/index.js
```

## Important Note

Task 05 performs real HTTP requests to:

```text
jsonplaceholder.typicode.com
```

An internet connection is therefore required for that part of the demonstration.

The other tasks run locally without external services.

## Project Structure

```text
async-programming-js-checkpoint/
├── src/
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Author

Taher Amine ELHOUARI
