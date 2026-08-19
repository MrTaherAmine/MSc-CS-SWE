# CAP and Consistency Trade-offs

A distributed NoSQL design must make workload-specific trade-offs rather than treating all data equally.

## Order State

Order creation and delivery-state transitions are business-critical. The design favors stronger consistency for these writes, accepting slightly higher latency when needed.

## Product Search

Search indexes may lag the source product document briefly. Availability and fast search responses are more important than making every search result synchronously consistent with the latest write.

## Analytics

Pre-aggregated analytics are deliberately eventually consistent. A dashboard that is seconds behind is acceptable if it avoids scanning millions of transactional order documents.

## Availability

Replica sets allow a failed node to be replaced by another replica. Sharding distributes both data and traffic so the system does not depend on a single storage node.

## Partition Tolerance

Once the database is distributed across multiple nodes and failure domains, network partitions must be expected. The design protects transactional correctness where required while allowing derived/search workloads to favor availability and performance.
