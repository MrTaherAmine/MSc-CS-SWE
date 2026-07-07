/*
Optimizing Task Scheduling System

Requirements covered:
1. Create a list of tasks with:
   - Name
   - Start time
   - End time
   - Priority

2. Implement:
   - Sort tasks by start time
   - Group tasks by priority using a hash map/object
   - Detect overlapping tasks
   - Analyze time and space complexity
   - Optional memory usage estimation

Run:
node taskScheduler.js
*/

const tasks = [
  {
    name: "Design homepage",
    startTime: "09:00",
    endTime: "10:30",
    priority: "High",
  },
  {
    name: "Team meeting",
    startTime: "10:00",
    endTime: "11:00",
    priority: "Medium",
  },
  {
    name: "Code review",
    startTime: "11:30",
    endTime: "12:30",
    priority: "High",
  },
  {
    name: "Lunch break",
    startTime: "12:30",
    endTime: "13:00",
    priority: "Low",
  },
  {
    name: "Database optimization",
    startTime: "10:45",
    endTime: "12:00",
    priority: "High",
  },
  {
    name: "Write documentation",
    startTime: "14:00",
    endTime: "15:30",
    priority: "Medium",
  },
];

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/*
Function: sortTasksByStartTime

Purpose:
Sorts tasks by their start time using JavaScript's built-in sort method.

Time Complexity:
O(n log n), where n is the number of tasks.

Space Complexity:
O(1) or O(n), depending on the JavaScript engine implementation.
The function creates a shallow copy first, so the practical extra space is O(n).
*/
function sortTasksByStartTime(taskList) {
  return [...taskList].sort((a, b) => {
    return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
  });
}

/*
Function: groupTasksByPriority

Purpose:
Groups tasks by priority using a hash map/object.

Time Complexity:
O(n), because each task is visited once.

Space Complexity:
O(n), because all tasks are stored inside priority groups.
*/
function groupTasksByPriority(taskList) {
  const groupedTasks = {};

  for (const task of taskList) {
    if (!groupedTasks[task.priority]) {
      groupedTasks[task.priority] = [];
    }

    groupedTasks[task.priority].push(task);
  }

  return groupedTasks;
}

/*
Function: detectOverlappingTasks

Purpose:
Detects overlapping tasks using an optimized interval scheduling pattern.

Optimization:
Instead of comparing every task with every other task using O(n²),
we first sort tasks by start time, then compare each task only with the next task.

Time Complexity:
O(n log n), because sorting is the dominant operation.

Space Complexity:
O(n), because we create a sorted copy and store overlaps.
*/
function detectOverlappingTasks(taskList) {
  const sortedTasks = sortTasksByStartTime(taskList);
  const overlaps = [];

  for (let i = 0; i < sortedTasks.length - 1; i++) {
    const currentTask = sortedTasks[i];
    const nextTask = sortedTasks[i + 1];

    const currentEnd = timeToMinutes(currentTask.endTime);
    const nextStart = timeToMinutes(nextTask.startTime);

    if (currentEnd > nextStart) {
      overlaps.push({
        task1: currentTask,
        task2: nextTask,
      });
    }
  }

  return overlaps;
}

/*
Function: estimateMemoryUsage

Purpose:
Provides a simple estimated memory usage based on the number of tasks.

Note:
This is only an approximation for learning purposes.
Actual memory usage depends on the JavaScript engine and runtime environment.

Time Complexity:
O(n), because it loops through all tasks.

Space Complexity:
O(1), because it only uses a fixed number of variables.
*/
function estimateMemoryUsage(taskList) {
  let totalCharacters = 0;

  for (const task of taskList) {
    totalCharacters += task.name.length;
    totalCharacters += task.startTime.length;
    totalCharacters += task.endTime.length;
    totalCharacters += task.priority.length;
  }

  const bytesPerCharacter = 2;
  const estimatedBytes = totalCharacters * bytesPerCharacter;

  return {
    numberOfTasks: taskList.length,
    estimatedBytes,
    estimatedKB: (estimatedBytes / 1024).toFixed(2),
  };
}

function displayTasks(title, taskList) {
  console.log(`\n${title}`);
  console.log("-".repeat(title.length));

  for (const task of taskList) {
    console.log(
      `${task.name} | ${task.startTime} - ${task.endTime} | Priority: ${task.priority}`
    );
  }
}

function displayGroupedTasks(groupedTasks) {
  console.log("\nTasks Grouped by Priority");
  console.log("-------------------------");

  for (const priority in groupedTasks) {
    console.log(`\n${priority} Priority:`);

    for (const task of groupedTasks[priority]) {
      console.log(`- ${task.name} (${task.startTime} - ${task.endTime})`);
    }
  }
}

function displayOverlaps(overlaps) {
  console.log("\nOverlapping Tasks");
  console.log("-----------------");

  if (overlaps.length === 0) {
    console.log("No overlapping tasks found.");
    return;
  }

  for (const overlap of overlaps) {
    console.log(
      `${overlap.task1.name} overlaps with ${overlap.task2.name}`
    );
  }
}

function displayComplexityAnalysis() {
  console.log("\nComplexity Analysis");
  console.log("-------------------");
  console.log("1. Sort tasks by start time:");
  console.log("   Time Complexity: O(n log n)");
  console.log("   Space Complexity: O(n)");

  console.log("\n2. Group tasks by priority:");
  console.log("   Time Complexity: O(n)");
  console.log("   Space Complexity: O(n)");

  console.log("\n3. Detect overlapping tasks:");
  console.log("   Time Complexity: O(n log n)");
  console.log("   Space Complexity: O(n)");

  console.log("\n4. Estimate memory usage:");
  console.log("   Time Complexity: O(n)");
  console.log("   Space Complexity: O(1)");
}

// Main program execution
console.log("===== Optimizing Task Scheduling System =====");

displayTasks("Original Tasks", tasks);

const sortedTasks = sortTasksByStartTime(tasks);
displayTasks("Tasks Sorted by Start Time", sortedTasks);

const groupedTasks = groupTasksByPriority(tasks);
displayGroupedTasks(groupedTasks);

const overlappingTasks = detectOverlappingTasks(tasks);
displayOverlaps(overlappingTasks);

const memoryUsage = estimateMemoryUsage(tasks);
console.log("\nEstimated Memory Usage");
console.log("----------------------");
console.log(`Number of tasks: ${memoryUsage.numberOfTasks}`);
console.log(`Estimated bytes: ${memoryUsage.estimatedBytes}`);
console.log(`Estimated KB: ${memoryUsage.estimatedKB}`);

displayComplexityAnalysis();
