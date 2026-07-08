# Network Cable Optimization using MST

## Description

This checkpoint solves a network cable optimization problem using a Minimum Spanning Tree.

The goal is to connect all computers in an office with the minimum total cable cost and without creating loops.

The project uses **Kruskal's Algorithm** and **Disjoint Set Union (Union-Find)**.

---

## Problem

Each computer is represented as a vertex.

Each possible cable connection is represented as an edge with a cost.

The objective is to select the cheapest set of cable connections that:

- Connects all computers
- Contains no cycles
- Has the minimum total cost

---

## Algorithm Used

### Kruskal's Algorithm

Kruskal's Algorithm is a greedy algorithm used to find a Minimum Spanning Tree.

Steps:

1. Sort all cable connections by cost.
2. Start with an empty MST.
3. Add the cheapest connection if it does not create a cycle.
4. Use Union-Find to detect cycles.
5. Stop when the MST has `V - 1` edges.

---

## Data Structures Used

### Edge List

The graph is represented using a list of edges:

```javascript
{ from: "Computer A", to: "Computer B", cost: 4 }
```

### Disjoint Set / Union-Find

Used to check whether adding an edge will create a cycle.

---

## Output

The program outputs:

- Selected cable connections
- Total minimum network cost
- Complexity analysis

---

## Complexity

| Operation | Complexity |
|---|---|
| Sorting edges | O(E log E) |
| Union-Find operations | Almost O(1) |
| Overall complexity | O(E log E) |
| Space complexity | O(V + E) |

Where:

- `V` = number of computers
- `E` = number of cable connections

---

## Bonus Feature

The project includes dynamic functions to add computers and cable connections:

```javascript
addComputer(computers, "Computer F");
addCableConnection(cableConnections, "Computer E", "Computer F", 3);
```

---

## How to Run

Make sure Node.js is installed.

Run:

```bash
node index.js
```

---

## Files

- `index.js`: JavaScript implementation
- `README.md`: Project explanation

---

## Author

Taher Amine ELHOUARI
