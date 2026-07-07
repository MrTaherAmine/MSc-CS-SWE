# Choosing and Defending the Best Algorithm

## Project Description

This project analyzes two algorithmic strategies for a delivery platform backend system.

The system receives many delivery tasks, each with:

- Start time
- End time

The goal is to select the maximum number of non-overlapping tasks that a single delivery driver can perform.

Two approaches are implemented and compared:

1. Brute-force algorithm
2. Greedy algorithm using earliest finishing time

---

## Input Sample

```javascript
const tasks = [
  { start: 1, end: 3 },
  { start: 2, end: 5 },
  { start: 4, end: 6 },
  { start: 6, end: 7 },
  { start: 5, end: 9 },
  { start: 8, end: 10 }
];
```

Expected optimal selection size:

```text
4 tasks
```

One possible optimal schedule:

```text
(1, 3) -> (4, 6) -> (6, 7) -> (8, 10)
```

---

## Algorithms Implemented

## 1. Brute-Force Algorithm

The brute-force algorithm explores all possible combinations of tasks and keeps the largest valid non-overlapping set.

### Time Complexity

```text
O(2^n * n)
```

This is because every subset of tasks may be explored, and compatibility checks are needed.

### Space Complexity

```text
O(n)
```

The recursion stack and temporary selected task list can grow with the number of tasks.

### Advantages

- Always finds the optimal solution.
- Useful for small inputs.
- Helpful for validating other algorithms.

### Disadvantages

- Does not scale.
- Not suitable for real-time systems.
- Becomes impractical even with moderately large inputs.

---

## 2. Greedy Algorithm

The greedy algorithm sorts tasks by end time, then always selects the next compatible task that finishes earliest.

### Time Complexity

```text
O(n log n)
```

Sorting dominates the runtime.

### Space Complexity

```text
O(n)
```

The implementation creates a sorted copy and stores the selected result.

### Advantages

- Fast and scalable.
- Easy to understand and maintain.
- Suitable for real-time backend systems.
- Produces the optimal solution for the activity selection problem.

### Disadvantages

- Only works when the problem has the greedy-choice property.
- Not every optimization problem can be solved greedily.

---

## Performance Comparison

For large inputs such as 10,000 randomly generated tasks:

- The greedy algorithm runs efficiently.
- The brute-force algorithm is not executed on 10,000 tasks because its exponential complexity makes it impractical.

A smaller brute-force test is included with 20 tasks to show the performance difference without freezing execution.

---

## Recommendation

The recommended algorithm for the final delivery platform backend system is:

```text
Greedy algorithm
```

## Why?

The delivery task scheduling problem is equivalent to the classic Activity Selection problem.

Selecting the task that ends earliest leaves the maximum possible remaining time for future tasks. This greedy strategy gives an optimal result while keeping the implementation efficient.

For a system that handles thousands of tasks per second, the greedy algorithm is the correct choice because it is:

- Faster
- Easier to maintain
- Easier to scale
- Practical for real-time use

---

## When Brute Force Is Still Useful

The brute-force approach may still be useful for:

- Very small inputs
- Academic comparison
- Debugging
- Testing and validating the greedy solution on small datasets

It should not be used in production for large-scale real-time scheduling.

---

## Stress Tests Included

The project includes bonus edge cases:

1. All tasks overlapping
2. All tasks non-overlapping
3. Tasks with the same start or end time

These tests help confirm that the greedy algorithm behaves correctly across different scenarios.

---

## How to Run

Make sure Node.js is installed.

Then run:

```bash
node deliveryScheduler.js
```

---

## Files

- `deliveryScheduler.js`: Main JavaScript implementation
- `README.md`: Explanation, complexity analysis, and recommendation

---

## Author

Taher Amine ELHOUARI
