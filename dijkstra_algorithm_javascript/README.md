# Implementing Dijkstra's Algorithm in JavaScript

## Checkpoint

**Applied Algorithms in Software Development**  
**Title:** Implementing Dijkstra's Algorithm in JavaScript

## Objective

The objective of this project is to implement **Dijkstra's Algorithm** in JavaScript to find the shortest distances from a starting vertex to all other vertices in a weighted graph.

Dijkstra's Algorithm is commonly used in real-world systems such as:

- GPS navigation
- Network routing
- Delivery route optimization
- Game pathfinding
- Distributed systems

## What Is Dijkstra's Algorithm?

Dijkstra's Algorithm is a graph algorithm used to find the shortest path from one starting node to all other nodes in a weighted graph.

It works only when all edge weights are **non-negative**.

## Graph Representation

The graph is represented as a JavaScript object.

Example:

```javascript
const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 5, D: 10 },
  C: { A: 2, B: 5, D: 3 },
  D: { B: 10, C: 3 }
};
```

Each key represents a vertex.  
Each value represents the neighboring vertices and their edge weights.

## Function

```javascript
dijkstra(graph, start)
```

### Parameters

| Parameter | Description |
|---|---|
| `graph` | Object representing the weighted graph |
| `start` | Starting vertex |

### Return Value

The function returns an object containing the shortest distances from the starting vertex to every other vertex.

Example:

```javascript
dijkstra(graph, "A");
```

Output:

```javascript
{
  A: 0,
  B: 4,
  C: 2,
  D: 5
}
```

## Algorithm Steps

1. Set the distance of the starting vertex to `0`.
2. Set all other distances to `Infinity`.
3. Select the unvisited vertex with the smallest distance.
4. Visit its neighbors and update distances if a shorter path is found.
5. Mark the vertex as visited.
6. Repeat until all reachable vertices are visited.

## Time Complexity

This implementation uses a simple object and linear search to find the smallest unvisited distance.

| Operation | Complexity |
|---|---|
| Finding smallest unvisited vertex | O(V) |
| Processing all vertices | O(V²) |
| Edge relaxation | O(E) |
| Total Complexity | O(V² + E) |

For larger graphs, a priority queue or min-heap can improve performance to:

```text
O((V + E) log V)
```

## Files

- `index.js` — Main JavaScript implementation
- `README.md` — Project explanation and documentation

## How to Run

Make sure Node.js is installed.

Then run:

```bash
node index.js
```

## Expected Output

```text
Shortest distances from A:
{ A: 0, B: 4, C: 2, D: 5 }
```

## Important Notes

- Dijkstra's Algorithm does not work with negative weights.
- The graph can be directed or undirected.
- This checkpoint uses an adjacency object for simplicity.

## Conclusion

This project demonstrates how Dijkstra's Algorithm can be implemented in JavaScript and applied to shortest path problems in weighted graphs.
