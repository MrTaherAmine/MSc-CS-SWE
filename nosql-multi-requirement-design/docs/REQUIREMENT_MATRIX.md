# Requirement-to-Design Matrix

| Requirement | Initial Design Decision | Refactored Decision |
|---|---|---|
| Browse products | Product documents with browse indexes | Same, horizontally distributed |
| Search products | Text/search index | Search index + shard-aware operational layer |
| Order details | Embedded item/customer snapshots | Same source-of-truth document |
| Thousands TPS | Denormalized orders, indexed hot paths | Sharding + horizontal API scaling |
| Analytics | Operational aggregation only | Dedicated pre-aggregated read models |
| High availability | Single logical database design | Replica sets across failure domains |
| Partition tolerance | Not primary initial driver | Sharded distributed cluster |
| Fast dashboards | Expensive live aggregation | `daily_product_sales`, `daily_category_sales` |
| Strong correctness | Order state and inventory | Majority-style consistency for critical writes |
| Eventual consistency | Search/reporting acceptable | Explicitly used for derived analytics |
