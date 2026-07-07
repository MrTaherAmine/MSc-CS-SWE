# Optimizing Task Scheduling System

## Description

This project is a lightweight task scheduler for a to-do application.

It focuses on efficient solutions for task management, including:

- Sorting tasks by start time
- Grouping tasks by priority
- Detecting overlapping tasks
- Analyzing time and space complexity
- Estimating memory usage

The solution is implemented in JavaScript.

---

## Task Structure

Each task contains:

- `name`
- `startTime`
- `endTime`
- `priority`

Example:

```javascript
{
  name: "Design homepage",
  startTime: "09:00",
  endTime: "10:30",
  priority: "High"
}
```

---

## Features

### 1. Sort Tasks by Start Time

The system sorts tasks using JavaScript's built-in `Array.prototype.sort()` method with a custom comparison function.

Time complexity:

```text
O(n log n)
```

Space complexity:

```text
O(n)
```

---

### 2. Group Tasks by Priority

Tasks are grouped using a hash map/object.

Example:

```javascript
{
  High: [...],
  Medium: [...],
  Low: [...]
}
```

Time complexity:

```text
O(n)
```

Space complexity:

```text
O(n)
```

---

### 3. Detect Overlapping Tasks

The system uses an optimized interval scheduling pattern:

1. Sort tasks by start time.
2. Compare each task with the next task.
3. If the current task ends after the next task starts, there is an overlap.

Time complexity:

```text
O(n log n)
```

Space complexity:

```text
O(n)
```

This is better than the brute-force approach, which compares every task with every other task and takes:

```text
O(n²)
```

---

### 4. Estimate Memory Usage

The system includes an optional function to estimate memory usage based on stored task data.

Time complexity:

```text
O(n)
```

Space complexity:

```text
O(1)
```

---

## How to Run

Make sure Node.js is installed.

Then run:

```bash
node taskScheduler.js
```

---

## Example Output

```text
===== Optimizing Task Scheduling System =====

Original Tasks
--------------
Design homepage | 09:00 - 10:30 | Priority: High
Team meeting | 10:00 - 11:00 | Priority: Medium
Code review | 11:30 - 12:30 | Priority: High
Lunch break | 12:30 - 13:00 | Priority: Low
Database optimization | 10:45 - 12:00 | Priority: High
Write documentation | 14:00 - 15:30 | Priority: Medium

Tasks Sorted by Start Time
--------------------------
Design homepage | 09:00 - 10:30 | Priority: High
Team meeting | 10:00 - 11:00 | Priority: Medium
Database optimization | 10:45 - 12:00 | Priority: High
Code review | 11:30 - 12:30 | Priority: High
Lunch break | 12:30 - 13:00 | Priority: Low
Write documentation | 14:00 - 15:30 | Priority: Medium
```

---

## Files

- `taskScheduler.js`: Main JavaScript implementation
- `README.md`: Project documentation

---

## Author

Taher Amine ELHOUARI
