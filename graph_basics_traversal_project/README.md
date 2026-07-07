# Graph Basics and Traversal

## Description

This project implements a graph using an adjacency list in JavaScript.

It supports:

- Adding vertices
- Adding edges
- Removing edges
- Checking if an edge exists
- Printing the graph
- Depth-First Search traversal
- Breadth-First Search traversal
- Directed and undirected graphs

---

## Data Structure Used

The graph is represented using an adjacency list.

Example:

```javascript
{
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C"]
}
```

Each vertex stores a list of its neighbors.

---

## Traversal Algorithms

### DFS - Depth-First Search

DFS explores as far as possible along one path before backtracking.

### BFS - Breadth-First Search

BFS explores all neighbors first before moving to the next level.

---

## How to Run

Make sure Node.js is installed.

Then run:

```bash
node graph.js
```

---

## Example Output

```text
===== TEST 1: UNDIRECTED GRAPH =====
Undirected Graph:
A -> B, C
B -> A, D
C -> A, D
D -> B, C
Has edge A-B? true
Has edge A-D? false
DFS starting from A: A -> B -> D -> C
BFS starting from A: A -> B -> C -> D
```

---

## Files

- `graph.js`: Main JavaScript implementation
- `README.md`: Project documentation
