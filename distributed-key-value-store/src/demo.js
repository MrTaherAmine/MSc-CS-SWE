const DistributedKeyValueStore = require("./store");

/**
 * Demonstration of all checkpoint requirements.
 */
const store = new DistributedKeyValueStore({
  virtualNodes: 64,
  cacheCapacity: 3
});

function heading(title) {
  console.log("\n" + "=".repeat(72));
  console.log(title);
  console.log("=".repeat(72));
}

function printDistribution() {
  console.log(JSON.stringify(store.distribution(), null, 2));
}

// -----------------------------------------------------------------------------
// 1. Create an initial cluster.
// -----------------------------------------------------------------------------
heading("1. CREATE INITIAL CLUSTER");

store.addNode("node-A");
store.addNode("node-B");
store.addNode("node-C");

console.log("Nodes: node-A, node-B, node-C");

// -----------------------------------------------------------------------------
// 2. Insert the required example data.
// -----------------------------------------------------------------------------
heading("2. STORE EXAMPLE DATA");

const exampleData = {
  "user:101": { name: "Alice" },
  "user:102": { name: "Bob" },
  "user:103": { name: "Charlie" },
  "user:104": { name: "Diana" },
  "user:105": { name: "Eve" },
  "user:106": { name: "Frank" }
};

for (const [key, value] of Object.entries(exampleData)) {
  const result = store.put(key, value);
  console.log(`${key} -> ${result.storedOn}`);
}

console.log("\nInitial distribution:");
printDistribution();

// -----------------------------------------------------------------------------
// 3. Show transparent reads and caching.
// -----------------------------------------------------------------------------
heading("3. TRANSPARENT READS + LRU CACHE");

for (const key of ["user:101", "user:102", "user:103"]) {
  console.log(key, "=>", store.get(key));
}

// The second read should come from cache.
console.log("\nRead user:101 again:");
console.log("user:101 =>", store.get("user:101"));

console.log("\nCache contents:");
console.log(store.cacheSnapshot());

// -----------------------------------------------------------------------------
// 4. Add a node and show that only part of the data moves.
// -----------------------------------------------------------------------------
heading("4. NODE JOIN + MINIMAL DATA MOVEMENT");

const beforeJoin = store.keyPlacement();

const joinResult = store.addNode("node-D");

const afterJoin = store.keyPlacement();

let changedAfterJoin = 0;

for (const [key, oldOwner] of beforeJoin.entries()) {
  if (afterJoin.get(key) !== oldOwner) {
    changedAfterJoin += 1;
  }
}

console.log(joinResult);
console.log(
  `Keys whose owner changed: ${changedAfterJoin}/${beforeJoin.size}`
);

console.log("\nDistribution after node-D joins:");
printDistribution();

// -----------------------------------------------------------------------------
// 5. Remove a node.
// -----------------------------------------------------------------------------
heading("5. NODE LEAVE");

const beforeLeave = store.keyPlacement();
const leavingNodeKeys =
  store.nodes.get("node-B")?.entries().map(([key]) => key) || [];

console.log("Keys physically located on node-B before removal:", leavingNodeKeys);

const leaveResult = store.removeNode("node-B");

const afterLeave = store.keyPlacement();

let changedAfterLeave = 0;

for (const [key, oldOwner] of beforeLeave.entries()) {
  if (afterLeave.get(key) !== oldOwner) {
    changedAfterLeave += 1;
  }
}

console.log(leaveResult);
console.log(
  `Keys whose owner changed after node-B left: ${changedAfterLeave}/${beforeLeave.size}`
);

console.log("\nDistribution after node-B leaves:");
printDistribution();

// -----------------------------------------------------------------------------
// 6. Demonstrate failure handling and limited availability.
// -----------------------------------------------------------------------------
heading("6. SIMULATE NODE FAILURE");

const testKey = "user:104";
const ownerBeforeFailure = store.getOwnerNode(testKey);

console.log(`${testKey} is owned by ${ownerBeforeFailure.id}`);

// Clear cache so the next read must contact the node.
store.cache.clear();

store.failNode(ownerBeforeFailure.id);

console.log(`Failed node: ${ownerBeforeFailure.id}`);

console.log(
  `Read ${testKey} while its owner is offline:`,
  store.get(testKey)
);

// Other keys may still be available when they belong to healthy nodes.
const healthyKey = Object.keys(exampleData).find((key) => {
  return store.getOwnerNode(key).id !== ownerBeforeFailure.id;
});

console.log(
  `Read ${healthyKey} from another node:`,
  store.get(healthyKey)
);

console.log("\nCluster state during failure:");
printDistribution();

// -----------------------------------------------------------------------------
// 7. Recover the node.
// -----------------------------------------------------------------------------
heading("7. RECOVER NODE");

store.recoverNode(ownerBeforeFailure.id);

console.log(`Recovered node: ${ownerBeforeFailure.id}`);
console.log(`${testKey} =>`, store.get(testKey));

// -----------------------------------------------------------------------------
// 8. Demonstrate transparency.
// -----------------------------------------------------------------------------
heading("8. TRANSPARENCY");

console.log(
  "Application code uses store.put(), store.get(), and store.delete()."
);
console.log(
  "It does not need to know which physical node stores each key."
);

console.log("\nExample:");
console.log('store.get("user:105") =>', store.get("user:105"));

// -----------------------------------------------------------------------------
// 9. Metrics.
// -----------------------------------------------------------------------------
heading("9. FINAL METRICS");

console.log(store.metrics);
console.log("\nFinal distribution:");
printDistribution();
