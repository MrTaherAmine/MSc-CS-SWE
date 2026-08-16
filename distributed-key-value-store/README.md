# Distributed Key-Value Store with Consistent Hashing and Caching

Submission for:

**Distributed Systems with High-Level System Design : Microservices and Containerization**

## Features Implemented

- consistent hashing;
- virtual nodes;
- dynamic node join;
- node leave;
- minimal key movement on membership changes;
- LRU caching;
- node failure simulation;
- limited availability during failure;
- node recovery;
- transparent `put/get/delete` interface;
- required example dataset.

## Required Example Data

```json
{
  "user:101": { "name": "Alice" },
  "user:102": { "name": "Bob" },
  "user:103": { "name": "Charlie" },
  "user:104": { "name": "Diana" },
  "user:105": { "name": "Eve" },
  "user:106": { "name": "Frank" }
}
```

## Project Structure

```text
distributed-key-value-store/
├── docs/
│   └── DESIGN.md
├── src/
│   ├── cache.js
│   ├── demo.js
│   ├── hash.js
│   ├── node.js
│   └── store.js
├── .gitignore
├── package.json
└── README.md
```

## Run

No external packages are required.

```bash
npm start
```

or:

```bash
node src/demo.js
```

## What the Demonstration Shows

The demo executes the checkpoint requirements in sequence:

1. creates three storage nodes;
2. inserts the six required users;
3. shows initial key distribution;
4. demonstrates transparent reads;
5. demonstrates the LRU cache;
6. adds `node-D`;
7. measures how many keys actually move;
8. removes `node-B`;
9. displays the resulting distribution;
10. fails the node responsible for a selected key;
11. demonstrates limited availability;
12. proves that keys on healthy nodes still respond;
13. recovers the failed node;
14. prints final metrics and distribution.

## Consistent Hashing

Keys and virtual nodes are placed into a 32-bit hash ring.

The key is assigned to the first node token clockwise from the key's hash.

When a new node joins, only keys whose ring ownership changes need to move.

This avoids redistributing the entire dataset.

## Cache

The cache uses an LRU policy.

Repeated reads can be served from the cache without contacting a storage node.

The demo uses a cache capacity of three items so eviction behavior is easy to
observe.

## Failure Behavior

This project intentionally models **limited availability**.

There is no hidden replication pretending that an offline node's uncached
data is still available.

When a node fails:

- keys owned by other nodes continue working;
- cached values can still be returned;
- an uncached key owned by the failed node reports temporary unavailability.

## Transparency

Application users call:

```js
store.put("user:101", { name: "Alice" });
store.get("user:101");
store.delete("user:101");
```

They do not need to know the physical node responsible for the key.

## Design Documentation

See:

```text
docs/DESIGN.md
```

for the architecture explanation.

## Syntax Check

```bash
npm run check
```

## Suggested Repository Name

```text
distributed-key-value-store
```

## Author

Taher Amine ELHOUARI
