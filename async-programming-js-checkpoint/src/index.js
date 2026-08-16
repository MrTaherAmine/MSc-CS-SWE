// Asynchronous Programming in JavaScript Checkpoint
//
// This submission implements all requested tasks, not only the minimum three.
// Node.js 18+ is recommended because fetch() is available globally.

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

// ------------------------------------------------------------
// Task 01 - Iterating with Async/Await
// ------------------------------------------------------------
async function iterateWithAsyncAwait(values) {
  console.log("\nTask 01 - Iterating with Async/Await");

  for (const value of values) {
    console.log(value);
    await delay(1000);
  }
}

// ------------------------------------------------------------
// Task 02 + Task 03 - Awaiting a Call + Error Handling
// ------------------------------------------------------------
async function fakeApiCall(shouldFail = false) {
  await delay(1000);

  if (shouldFail) {
    throw new Error("Simulated API failure");
  }

  return {
    id: 1,
    message: "Data successfully fetched",
    timestamp: new Date().toISOString()
  };
}

async function awaitCall(shouldFail = false) {
  console.log("\nTask 02 / 03 - Awaiting a Call and Handling Errors");

  try {
    const data = await fakeApiCall(shouldFail);
    console.log("API response:", data);
    return data;
  } catch (error) {
    console.error(
      "Sorry, we could not retrieve the requested data. Please try again later."
    );
    return null;
  }
}

// ------------------------------------------------------------
// Task 03 - Chaining Async/Await
// ------------------------------------------------------------
async function firstAsyncFunction() {
  await delay(1000);
  console.log("First async function completed.");
}

async function secondAsyncFunction() {
  await delay(1000);
  console.log("Second async function completed.");
}

async function thirdAsyncFunction() {
  await delay(1000);
  console.log("Third async function completed.");
}

async function chainedAsyncFunctions() {
  console.log("\nTask 03 - Chaining Async/Await");

  await firstAsyncFunction();
  await secondAsyncFunction();
  await thirdAsyncFunction();

  console.log("All chained async functions completed.");
}

// ------------------------------------------------------------
// Task 04 - Awaiting Concurrent Requests
// ------------------------------------------------------------
async function mockRequest(name, waitTime) {
  await delay(waitTime);

  return {
    request: name,
    status: "success",
    waitTime
  };
}

async function concurrentRequests() {
  console.log("\nTask 04 - Awaiting Concurrent Requests");

  const [resultA, resultB] = await Promise.all([
    mockRequest("Request A", 1200),
    mockRequest("Request B", 800)
  ]);

  const combinedResults = {
    resultA,
    resultB
  };

  console.log("Combined results:", combinedResults);

  return combinedResults;
}

// ------------------------------------------------------------
// Task 05 - Awaiting Parallel Calls
// ------------------------------------------------------------
async function parallelCalls(urls) {
  console.log("\nTask 05 - Awaiting Parallel Calls");

  try {
    const responses = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Request to ${url} failed with status ${response.status}`
          );
        }

        return response.json();
      })
    );

    console.log("Parallel responses:", responses);

    return responses;
  } catch (error) {
    console.error("One or more parallel requests failed:", error.message);
    return [];
  }
}

// ------------------------------------------------------------
// Demo Runner
// ------------------------------------------------------------
async function runDemo() {
  console.log("=== Async/Await Checkpoint Demo ===");

  await iterateWithAsyncAwait(["A", "B", "C"]);

  await awaitCall(false);

  // Uncomment this line to test graceful error handling:
  // await awaitCall(true);

  await chainedAsyncFunctions();

  await concurrentRequests();

  await parallelCalls([
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2"
  ]);

  console.log("\n=== Demo Complete ===");
}

runDemo().catch((error) => {
  console.error("Unexpected error:", error);
});

module.exports = {
  iterateWithAsyncAwait,
  awaitCall,
  chainedAsyncFunctions,
  concurrentRequests,
  parallelCalls
};
