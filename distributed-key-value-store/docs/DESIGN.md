# Distributed Key-Value Store - Design Notes

## 1. Goal

The system simulates a distributed key-value store that provides a simple API:

```js
store.put(key, value)
store.get(key)
store.delete(key)
```

The caller does not need to know which physical node stores a key.

That provides **location transparency**.

---

## 2. Consistent Hashing

A traditional hash distribution might calculate:

```text
hash(key) % numberOfNodes
```

The problem is that changing the number of nodes changes the result for many
keys.

This checkpoint instead uses a **consistent hash ring**.

Both nodes and keys are mapped into the same hash space.

For a key:

1. hash the key;
2. move clockwise around the ring;
3. choose the first node token encountered;
4. wrap back to the first token if necessary.

### Virtual Nodes

Each physical node receives multiple positions on the ring.

For example:

```text
node-A#0
node-A#1
node-A#2
...
```

Virtual nodes improve distribution compared with assigning only one hash
position to each physical server.

---

## 3. Node Join

When a new node joins:

1. virtual-node positions are added to the ring;
2. each existing key is checked against the new ring;
3. a key moves only if its new owner differs from its old owner.

This demonstrates the main advantage of consistent hashing:

> cluster membership changes do not require a complete redistribution of data.

The demo prints the number of keys whose owners changed.

---

## 4. Node Leave

When a physical node leaves, keys are re-evaluated against the remaining ring.

The keys that depended on the removed node are assigned to the next valid
owners.

The simulation rebuilds the placement from the known dataset for clarity.

---

## 5. Caching

The project implements an **LRU cache**.

LRU means:

```text
Least Recently Used
```

When the cache is full, the least recently accessed item is evicted.

The cache:

- reduces repeated node reads;
- demonstrates faster access to popular keys;
- is transparent to the caller.

The demo intentionally reads `user:101` twice so the second lookup can be
served from cache.

---

## 6. Failure Simulation

Each physical node has an:

```text
online
```

state.

A node can be failed with:

```js
store.failNode("node-A")
```

and recovered with:

```js
store.recoverNode("node-A")
```

### Limited availability

This basic checkpoint design does not replicate every key.

Therefore:

- keys stored on healthy nodes remain available;
- a cached key may remain available;
- a non-cached key whose owner is offline becomes temporarily unavailable.

That satisfies the assignment's requirement to demonstrate **limited
availability** rather than pretending that data remains fully available
without replication.

---

## 7. Transparency

Users interact only with the distributed-store interface.

They never call:

```text
node-A
node-C
node-D
```

directly.

The system internally determines the owner with consistent hashing.

This hides:

- node IDs;
- key placement;
- cluster membership;
- hash-ring logic;
- cache lookup logic.

---

## 8. Scalability

The design supports horizontal membership changes:

```text
addNode()
removeNode()
```

and consistent hashing limits data movement when the cluster changes.

A real production design would additionally add:

- replication;
- quorum reads/writes;
- persistent disks;
- health checks;
- network communication;
- leader/failure detection;
- anti-entropy repair;
- security and authentication;
- observability.

Those features are outside the scope of this checkpoint simulation.
