# Designing NoSQL Databases Based on Multiple Requirement Views

Master Degree Highlights checkpoint demonstrating how a NoSQL e-commerce data model evolves when requirements change from operational transaction processing toward large-scale analytics, high availability, and partition tolerance.

## Scenario

The initial system must support:

- product browsing and search;
- order storage with customer, purchased items, and delivery status;
- thousands of transactions per second.

The refactored system must additionally support:

- large-scale analytical queries for product and sales trends;
- high availability;
- partition tolerance;
- horizontal scalability.

## Technology Choice

The design uses **MongoDB's document model** as the primary operational NoSQL database because the core entities map naturally to documents and the application needs flexible schemas, denormalized read models, secondary indexes, replication, and sharding.

For product search, the schema is designed to work with a full-text/search index. For analytics, the refactored version introduces dedicated pre-aggregated collections rather than forcing transactional collections to serve every analytical workload.

## Repository Structure

```text
.
├── initial/
│   ├── INITIAL_SCHEMA.md
│   ├── collections.json
│   └── indexes.js
├── refactored/
│   ├── REFACTORED_SCHEMA.md
│   ├── analytics-models.json
│   ├── indexes.js
│   └── sharding-and-replication.js
├── examples/
│   ├── query-patterns.js
│   └── analytics-pipelines.js
├── docs/
│   ├── REQUIREMENT_MATRIX.md
│   ├── CAP_TRADEOFFS.md
│   └── REFLECTION.md
└── README.md
```

## Initial Design Summary

The initial design separates:

- `users`
- `products`
- `orders`

Orders embed a snapshot of purchased items and delivery information. This avoids expensive joins and preserves the exact product/price state used when the purchase occurred.

Indexes are driven by query patterns:

- product SKU and slug lookup;
- category and availability filtering;
- text/search queries;
- customer order history;
- order status and creation time.

## Refactored Design Summary

The refactored architecture adds:

- **sharding** for horizontal scale;
- **replica sets** for availability and fault tolerance;
- **denormalized analytics collections** such as `daily_product_sales`;
- **pre-aggregated category/day summaries**;
- a deliberate split between operational queries and analytical read models.

This improves throughput and analytical latency while introducing controlled duplication and eventual consistency for derived analytics.

## Recommended GitHub Repository Name

`nosql-multi-requirement-design`

## Author

**Taher Amine ELHOUARI**

Master Degree Highlights — Software Engineering
