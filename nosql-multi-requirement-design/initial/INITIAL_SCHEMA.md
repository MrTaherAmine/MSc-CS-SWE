# Initial NoSQL Schema Design

## 1. Requirement View

The original system has three dominant requirements:

1. users must browse and search products quickly;
2. orders must preserve customer, purchased-item, and delivery-status information;
3. the platform must sustain thousands of transactions per second.

The design therefore prioritizes predictable access patterns, write scalability, and avoiding relational joins in hot request paths.

## 2. Selected Model: Document Database

A document model is appropriate because:

- product records contain flexible attributes;
- orders naturally contain nested line items;
- order data should preserve a purchase-time snapshot;
- data can be denormalized for fast reads;
- horizontal partitioning can be introduced later without redesigning the application around relational joins.

## 3. Collections

### `users`

```json
{
  "_id": "ObjectId",
  "email": "user@example.com",
  "name": {
    "first": "Amina",
    "last": "Benali"
  },
  "addresses": [
    {
      "addressId": "addr-001",
      "label": "Home",
      "city": "Algiers",
      "country": "DZ",
      "postalCode": "16000",
      "isDefault": true
    }
  ],
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

The user document embeds frequently accessed address information because it is usually read together with the user profile.

### `products`

```json
{
  "_id": "ObjectId",
  "sku": "LAP-001",
  "slug": "ultrabook-pro-14",
  "name": "Ultrabook Pro 14",
  "description": "Lightweight business laptop",
  "category": {
    "id": "computers",
    "name": "Computers"
  },
  "price": {
    "amount": 1299.00,
    "currency": "USD"
  },
  "inventory": {
    "available": 42,
    "reserved": 3
  },
  "attributes": {
    "ram": "32GB",
    "storage": "1TB",
    "color": "Graphite"
  },
  "tags": ["laptop", "business", "portable"],
  "active": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

Product attributes are intentionally flexible because different product categories may require different properties.

### `orders`

```json
{
  "_id": "ObjectId",
  "orderId": "ORD-2026-000001",
  "customer": {
    "userId": "ObjectId",
    "email": "user@example.com",
    "name": "Amina Benali"
  },
  "items": [
    {
      "productId": "ObjectId",
      "sku": "LAP-001",
      "name": "Ultrabook Pro 14",
      "quantity": 1,
      "unitPrice": 1299.00,
      "currency": "USD"
    }
  ],
  "totals": {
    "subtotal": 1299.00,
    "shipping": 15.00,
    "tax": 0.00,
    "grandTotal": 1314.00,
    "currency": "USD"
  },
  "delivery": {
    "status": "processing",
    "addressSnapshot": {
      "city": "Algiers",
      "country": "DZ",
      "postalCode": "16000"
    },
    "carrier": null,
    "trackingNumber": null
  },
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

The order embeds product and customer snapshots so an order remains historically correct even if a product name, price, or customer address changes later.

## 4. Relationship Strategy

The design deliberately mixes references and embedding:

- user/product identity uses references;
- purchase-time order details are embedded;
- search/browse attributes are kept directly in `products`.

This avoids cross-collection joins on the most frequent paths.

## 5. Consistency Decisions

Strong consistency is most important for:

- order creation;
- payment/order state transitions;
- stock reservation updates.

Less critical operations can tolerate eventual consistency:

- product search indexes;
- popularity counters;
- reporting summaries.

## 6. Initial Scaling Strategy

The initial version is designed so that:

- stateless application servers can scale horizontally;
- database indexes support common lookups;
- product search can use a dedicated search index;
- orders avoid normalized joins;
- future sharding can be introduced without changing the public API.
