/*
Checkpoint: Network Cable Optimization using Minimum Spanning Tree

Description:
This program connects several computers in an office with the minimum total cable cost.
It uses Kruskal's Algorithm to build a Minimum Spanning Tree (MST).

Run:
node index.js
*/

// ==============================
// DISJOINT SET / UNION-FIND
// ==============================

class DisjointSet {
  constructor(vertices) {
    this.parent = {};
    this.rank = {};

    for (const vertex of vertices) {
      this.parent[vertex] = vertex;
      this.rank[vertex] = 0;
    }
  }

  find(vertex) {
    if (this.parent[vertex] !== vertex) {
      this.parent[vertex] = this.find(this.parent[vertex]);
    }

    return this.parent[vertex];
  }

  union(vertexA, vertexB) {
    const rootA = this.find(vertexA);
    const rootB = this.find(vertexB);

    if (rootA === rootB) {
      return false;
    }

    if (this.rank[rootA] < this.rank[rootB]) {
      this.parent[rootA] = rootB;
    } else if (this.rank[rootA] > this.rank[rootB]) {
      this.parent[rootB] = rootA;
    } else {
      this.parent[rootB] = rootA;
      this.rank[rootA]++;
    }

    return true;
  }
}

// ==============================
// KRUSKAL MST ALGORITHM
// ==============================

function kruskalMST(vertices, edges) {
  const disjointSet = new DisjointSet(vertices);

  const sortedEdges = [...edges].sort((a, b) => a.cost - b.cost);

  const selectedConnections = [];
  let totalCost = 0;

  for (const edge of sortedEdges) {
    const { from, to, cost } = edge;

    if (disjointSet.find(from) !== disjointSet.find(to)) {
      selectedConnections.push(edge);
      totalCost += cost;
      disjointSet.union(from, to);
    }

    if (selectedConnections.length === vertices.length - 1) {
      break;
    }
  }

  if (selectedConnections.length !== vertices.length - 1) {
    throw new Error("The graph is disconnected. Not all computers can be connected.");
  }

  return {
    selectedConnections,
    totalCost,
  };
}

// ==============================
// SAMPLE OFFICE NETWORK
// ==============================

const computers = ["Computer A", "Computer B", "Computer C", "Computer D", "Computer E"];

const cableConnections = [
  { from: "Computer A", to: "Computer B", cost: 4 },
  { from: "Computer A", to: "Computer C", cost: 2 },
  { from: "Computer B", to: "Computer C", cost: 1 },
  { from: "Computer B", to: "Computer D", cost: 5 },
  { from: "Computer C", to: "Computer D", cost: 8 },
  { from: "Computer C", to: "Computer E", cost: 10 },
  { from: "Computer D", to: "Computer E", cost: 2 },
  { from: "Computer B", to: "Computer E", cost: 6 },
];

// ==============================
// BONUS: DYNAMIC INPUT FUNCTIONS
// ==============================

function addComputer(vertices, computerName) {
  if (!vertices.includes(computerName)) {
    vertices.push(computerName);
  }
}

function addCableConnection(edges, from, to, cost) {
  if (cost <= 0) {
    throw new Error("Cable cost must be greater than 0.");
  }

  edges.push({ from, to, cost });
}

// Example of dynamic input usage:
addComputer(computers, "Computer F");
addCableConnection(cableConnections, "Computer E", "Computer F", 3);
addCableConnection(cableConnections, "Computer D", "Computer F", 7);

// ==============================
// OUTPUT FUNCTION
// ==============================

function printMSTResult(result) {
  console.log("\n===== NETWORK CABLE OPTIMIZATION RESULT =====\n");

  console.log("Selected cable connections:");

  for (const edge of result.selectedConnections) {
    console.log(`${edge.from} -- ${edge.to} | Cost: ${edge.cost}`);
  }

  console.log("\nTotal minimum network cost:", result.totalCost);
}

function printComplexityAnalysis() {
  console.log("\n===== COMPLEXITY ANALYSIS =====\n");

  console.log("Algorithm used: Kruskal's Algorithm");
  console.log("Sorting edges: O(E log E)");
  console.log("Union-Find operations: almost O(1) with path compression and union by rank");
  console.log("Overall complexity: O(E log E)");
  console.log("Space complexity: O(V + E)");
}

// ==============================
// MAIN EXECUTION
// ==============================

try {
  const mstResult = kruskalMST(computers, cableConnections);
  printMSTResult(mstResult);
  printComplexityAnalysis();
} catch (error) {
  console.log("Error:", error.message);
}
