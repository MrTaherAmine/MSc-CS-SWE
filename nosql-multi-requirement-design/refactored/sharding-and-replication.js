// Illustrative MongoDB sharding commands.
// Execute only on a correctly configured sharded cluster.

// Enable sharding for the application database.
sh.enableSharding("commerce");

// High-cardinality hashed shard key for order write distribution.
// Field duplication (`customerId`) at the order root is intentional:
// it makes the shard key directly addressable without nested-field ambiguity.
db.orders.updateMany(
  { customerId: { $exists: false } },
  [{ $set: { customerId: "$customer.userId" } }]
);

sh.shardCollection("commerce.orders", { customerId: "hashed" });

// Product distribution example.
sh.shardCollection("commerce.products", { _id: "hashed" });

// Analytics collections can also be sharded when they grow substantially.
// A compound key can support date-oriented analytical workloads.
sh.shardCollection(
  "commerce.daily_product_sales",
  { "_id.date": 1, "_id.productId": "hashed" }
);

/*
Replication is configured at the infrastructure/cluster level.
Each shard should be deployed as a replica set with multiple members,
preferably spread across failure domains / availability zones.

Application write concern for order state can be configured to require
acknowledgement from a majority of replica-set members where correctness
is more important than minimum latency.
*/
