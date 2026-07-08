/*
  Applied Algorithms in Software Development
  Checkpoint: Implementing Dijkstra's Algorithm in JavaScript

  Objective:
  Find the shortest distances from a starting vertex to all other vertices
  in a weighted graph with non-negative edge weights.

  Author: Taher Amine ELHOUARI
*/

/**
 * Dijkstra's Algorithm
 *
 * @param {Object} graph - Weighted graph represented as an adjacency object.
 * Example:
 * {
 *   A: { B: 4, C: 2 },
 *   B: { A: 4, C: 5, D: 10 },
 *   C: { A: 2, B: 5, D: 3 },
 *   D: { B: 10, C: 3 }
 * }
 *
 * @param {string} start - Starting vertex.
 * @returns {Object} shortest distances from start to all vertices.
 */
function dijkstra(graph, start) {
  if (!graph || typeof graph !== "object") {
    throw new Error("Graph must be a valid object.");
  }

  if (!graph[start]) {
    throw new Error("Starting vertex does not exist in the graph.");
  }

  const distances = {};
  const visited = new Set();

  // Initialize all distances to infinity
  for (const vertex in graph) {
    distances[vertex] = Infinity;
  }

  // Distance from the start vertex to itself is 0
  distances[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    let currentVertex = null;
    let shortestDistance = Infinity;

    // Find the unvisited vertex with the smallest known distance
    for (const vertex in distances) {
      if (!visited.has(vertex) && distances[vertex] < shortestDistance) {
        shortestDistance = distances[vertex];
        currentVertex = vertex;
      }
    }

    // If no reachable unvisited vertex exists, stop
    if (currentVertex === null) {
      break;
    }

    visited.add(currentVertex);

    // Relax neighboring edges
    const neighbors = graph[currentVertex];

    for (const neighbor in neighbors) {
      const weight = neighbors[neighbor];

      if (weight < 0) {
        throw new Error("Dijkstra's algorithm does not support negative weights.");
      }

      const newDistance = distances[currentVertex] + weight;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
      }
    }
  }

  return distances;
}

// ----------------------
// Test Case 1
// ----------------------

const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 5, D: 10 },
  C: { A: 2, B: 5, D: 3 },
  D: { B: 10, C: 3 }
};

console.log("Graph:");
console.log(graph);

console.log("\nShortest distances from A:");
console.log(dijkstra(graph, "A"));
// Expected output: { A: 0, B: 4, C: 2, D: 5 }

// ----------------------
// Test Case 2
// ----------------------

const deliveryGraph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 1, D: 5 },
  C: { A: 2, B: 1, D: 8, E: 10 },
  D: { B: 5, C: 8, E: 2, F: 6 },
  E: { C: 10, D: 2, F: 3 },
  F: { D: 6, E: 3 }
};

console.log("\nDelivery network shortest distances from A:");
console.log(dijkstra(deliveryGraph, "A"));
// Expected shortest distance to F: 13

// Export function for testing or reuse
module.exports = dijkstra;
