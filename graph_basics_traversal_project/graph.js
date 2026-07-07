/*
Graph Basics and Traversal Checkpoint

Requirements covered:
- Graph represented as an adjacency list
- Add edges
- Remove edges
- Check if an edge exists
- Print the graph
- DFS traversal
- BFS traversal
- Supports directed and undirected graphs
- Tested with at least 3 vertices

Run:
node graph.js
*/

class Graph {
  constructor(isDirected = false) {
    this.adjacencyList = {};
    this.isDirected = isDirected;
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    if (!this.adjacencyList[vertex1].includes(vertex2)) {
      this.adjacencyList[vertex1].push(vertex2);
    }

    if (!this.isDirected) {
      if (!this.adjacencyList[vertex2].includes(vertex1)) {
        this.adjacencyList[vertex2].push(vertex1);
      }
    }
  }

  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (neighbor) => neighbor !== vertex2
      );
    }

    if (!this.isDirected && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (neighbor) => neighbor !== vertex1
      );
    }
  }

  hasEdge(vertex1, vertex2) {
    return (
      this.adjacencyList[vertex1] &&
      this.adjacencyList[vertex1].includes(vertex2)
    );
  }

  printGraph() {
    console.log(this.isDirected ? "Directed Graph:" : "Undirected Graph:");

    for (let vertex in this.adjacencyList) {
      console.log(`${vertex} -> ${this.adjacencyList[vertex].join(", ")}`);
    }
  }

  dfs(startVertex) {
    if (!this.adjacencyList[startVertex]) {
      console.log(`Vertex ${startVertex} does not exist.`);
      return [];
    }

    const visited = {};
    const result = [];

    const dfsHelper = (vertex) => {
      visited[vertex] = true;
      result.push(vertex);

      for (let neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) {
          dfsHelper(neighbor);
        }
      }
    };

    dfsHelper(startVertex);

    console.log(`DFS starting from ${startVertex}: ${result.join(" -> ")}`);
    return result;
  }

  bfs(startVertex) {
    if (!this.adjacencyList[startVertex]) {
      console.log(`Vertex ${startVertex} does not exist.`);
      return [];
    }

    const visited = {};
    const queue = [];
    const result = [];

    visited[startVertex] = true;
    queue.push(startVertex);

    while (queue.length > 0) {
      const currentVertex = queue.shift();
      result.push(currentVertex);

      for (let neighbor of this.adjacencyList[currentVertex]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }

    console.log(`BFS starting from ${startVertex}: ${result.join(" -> ")}`);
    return result;
  }
}

/*
Test 1: Undirected graph
Vertices: A, B, C, D
Edges:
A - B
A - C
B - D
C - D
*/

console.log("===== TEST 1: UNDIRECTED GRAPH =====");

const undirectedGraph = new Graph(false);

undirectedGraph.addEdge("A", "B");
undirectedGraph.addEdge("A", "C");
undirectedGraph.addEdge("B", "D");
undirectedGraph.addEdge("C", "D");

undirectedGraph.printGraph();

console.log("Has edge A-B?", undirectedGraph.hasEdge("A", "B"));
console.log("Has edge A-D?", undirectedGraph.hasEdge("A", "D"));

undirectedGraph.dfs("A");
undirectedGraph.bfs("A");

console.log("\nRemoving edge A-C...");
undirectedGraph.removeEdge("A", "C");
undirectedGraph.printGraph();

/*
Test 2: Directed graph
Vertices: X, Y, Z
Edges:
X -> Y
X -> Z
Y -> Z
*/

console.log("\n===== TEST 2: DIRECTED GRAPH =====");

const directedGraph = new Graph(true);

directedGraph.addEdge("X", "Y");
directedGraph.addEdge("X", "Z");
directedGraph.addEdge("Y", "Z");

directedGraph.printGraph();

console.log("Has edge X-Y?", directedGraph.hasEdge("X", "Y"));
console.log("Has edge Y-X?", directedGraph.hasEdge("Y", "X"));

directedGraph.dfs("X");
directedGraph.bfs("X");

console.log("\nRemoving edge X-Z...");
directedGraph.removeEdge("X", "Z");
directedGraph.printGraph();
