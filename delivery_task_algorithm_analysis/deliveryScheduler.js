/*
Choosing and Defending the Best Algorithm
Delivery Task Scheduling Optimization

Goal:
Select the maximum number of non-overlapping delivery tasks that a single driver can perform.

Implemented approaches:
1. Brute-force solution that explores combinations.
2. Greedy solution that selects tasks ending earliest.

Run:
node deliveryScheduler.js
*/

const sampleTasks = [
  { start: 1, end: 3 },
  { start: 2, end: 5 },
  { start: 4, end: 6 },
  { start: 6, end: 7 },
  { start: 5, end: 9 },
  { start: 8, end: 10 }
];

function doTasksOverlap(taskA, taskB) {
  return taskA.start < taskB.end && taskB.start < taskA.end;
}

function isCompatible(task, selectedTasks) {
  for (const selectedTask of selectedTasks) {
    if (doTasksOverlap(task, selectedTask)) {
      return false;
    }
  }

  return true;
}

/*
Brute-force algorithm

Idea:
Explore every possible combination of tasks and keep the largest valid set
of non-overlapping tasks.

Time Complexity:
O(2^n * n), because it explores all subsets and checks compatibility.

Space Complexity:
O(n), for recursion depth and storing the current selected tasks.

Important:
This is correct but does not scale to large inputs.
For that reason, the large benchmark uses only the greedy algorithm.
*/
function bruteForceSchedule(tasks) {
  let bestSchedule = [];

  function backtrack(index, currentSchedule) {
    if (index === tasks.length) {
      if (currentSchedule.length > bestSchedule.length) {
        bestSchedule = [...currentSchedule];
      }
      return;
    }

    const currentTask = tasks[index];

    // Option 1: include the task if it does not overlap
    if (isCompatible(currentTask, currentSchedule)) {
      currentSchedule.push(currentTask);
      backtrack(index + 1, currentSchedule);
      currentSchedule.pop();
    }

    // Option 2: skip the task
    backtrack(index + 1, currentSchedule);
  }

  backtrack(0, []);

  return bestSchedule;
}

/*
Greedy algorithm

Idea:
Sort tasks by end time, then always choose the next task that starts
after or at the end time of the last selected task.

Time Complexity:
O(n log n), because sorting dominates the algorithm.

Space Complexity:
O(n), because the function creates a sorted copy and stores the selected tasks.

Why this works:
For the activity selection problem, choosing the task that ends earliest
leaves the most remaining time for future tasks.
*/
function greedySchedule(tasks) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.end === b.end) {
      return a.start - b.start;
    }

    return a.end - b.end;
  });

  const selectedTasks = [];
  let lastEndTime = -Infinity;

  for (const task of sortedTasks) {
    if (task.start >= lastEndTime) {
      selectedTasks.push(task);
      lastEndTime = task.end;
    }
  }

  return selectedTasks;
}

function generateRandomTasks(count) {
  const tasks = [];

  for (let i = 0; i < count; i++) {
    const start = Math.floor(Math.random() * 100000);
    const duration = Math.floor(Math.random() * 100) + 1;
    const end = start + duration;

    tasks.push({ start, end });
  }

  return tasks;
}

function generateAllOverlappingTasks(count) {
  const tasks = [];

  for (let i = 0; i < count; i++) {
    tasks.push({ start: 1, end: 100 });
  }

  return tasks;
}

function generateAllNonOverlappingTasks(count) {
  const tasks = [];

  for (let i = 0; i < count; i++) {
    tasks.push({ start: i * 2, end: i * 2 + 1 });
  }

  return tasks;
}

function generateSameStartOrEndTasks() {
  return [
    { start: 1, end: 4 },
    { start: 1, end: 3 },
    { start: 1, end: 2 },
    { start: 2, end: 5 },
    { start: 3, end: 5 },
    { start: 4, end: 5 },
    { start: 5, end: 7 }
  ];
}

function printSchedule(title, schedule) {
  console.log(`\n${title}`);
  console.log("-".repeat(title.length));

  console.log(`Number of selected tasks: ${schedule.length}`);
  console.log(
    schedule
      .map((task) => `(${task.start}, ${task.end})`)
      .join(" -> ")
  );
}

function compareSampleInput() {
  console.log("===== SAMPLE INPUT VALIDATION =====");

  const bruteForceResult = bruteForceSchedule(sampleTasks);
  const greedyResult = greedySchedule(sampleTasks);

  printSchedule("Brute-force result", bruteForceResult);
  printSchedule("Greedy result", greedyResult);

  console.log(
    "\nBoth algorithms return the same number of selected tasks:",
    bruteForceResult.length === greedyResult.length
  );
}

function benchmarkLargeInput() {
  console.log("\n===== LARGE INPUT BENCHMARK =====");

  const largeTasks = generateRandomTasks(10000);

  console.time("Greedy algorithm with 10,000 tasks");
  const greedyResult = greedySchedule(largeTasks);
  console.timeEnd("Greedy algorithm with 10,000 tasks");

  console.log(`Greedy selected ${greedyResult.length} tasks.`);

  console.log(
    "\nBrute-force was not executed on 10,000 tasks because its O(2^n) complexity makes it impractical for real-time systems."
  );

  const smallTasks = largeTasks.slice(0, 20);

  console.time("Brute-force algorithm with 20 tasks");
  const bruteForceResult = bruteForceSchedule(smallTasks);
  console.timeEnd("Brute-force algorithm with 20 tasks");

  console.log(`Brute-force selected ${bruteForceResult.length} tasks from 20 tasks.`);
}

function runStressTests() {
  console.log("\n===== BONUS STRESS TESTS =====");

  const allOverlapping = generateAllOverlappingTasks(10);
  const allNonOverlapping = generateAllNonOverlappingTasks(10);
  const sameStartOrEnd = generateSameStartOrEndTasks();

  printSchedule(
    "All tasks overlapping - Greedy",
    greedySchedule(allOverlapping)
  );

  printSchedule(
    "All tasks non-overlapping - Greedy",
    greedySchedule(allNonOverlapping)
  );

  printSchedule(
    "Same start or end time - Greedy",
    greedySchedule(sameStartOrEnd)
  );

  printSchedule(
    "Same start or end time - Brute-force",
    bruteForceSchedule(sameStartOrEnd)
  );
}

function printAnalysisAndRecommendation() {
  console.log("\n===== COMPARATIVE ANALYSIS =====");

  console.log(`
The greedy algorithm is faster for large inputs because it sorts the tasks by end time and then scans them once.
Its time complexity is O(n log n), which scales well for thousands of tasks per second.
The brute-force algorithm explores all combinations, giving it exponential time complexity O(2^n * n), so it becomes unusable as the number of tasks grows.

The greedy algorithm is also easier to maintain and scale because the logic is simple: sort by earliest end time, then select compatible tasks.
The brute-force solution is useful for learning, testing, and validating small datasets, but it is not appropriate for a real-time backend.

Memory trade-off:
The greedy solution uses O(n) extra memory for the sorted copy and selected result.
The brute-force solution uses recursion and can generate many combinations conceptually, making it much more expensive in practice.
`);

  console.log("===== FINAL RECOMMENDATION =====");

  console.log(`
Recommendation:
Use the greedy algorithm in the delivery platform backend.

Reason:
The problem is equivalent to the classic activity selection problem, where selecting the task that ends earliest produces an optimal solution.
The greedy approach is fast, clear, scalable, and suitable for real-time processing with thousands of tasks per second.

The brute-force method may still be relevant only for very small inputs, academic comparison, debugging, or verifying the correctness of the greedy implementation on small test cases.
`);
}

compareSampleInput();
benchmarkLargeInput();
runStressTests();
printAnalysisAndRecommendation();
