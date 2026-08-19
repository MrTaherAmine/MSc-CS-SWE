// Initial operational indexes.

db.users.createIndex({ email: 1 }, { unique: true });

db.products.createIndex({ sku: 1 }, { unique: true });
db.products.createIndex({ slug: 1 }, { unique: true });
db.products.createIndex({ "category.id": 1, active: 1 });
db.products.createIndex({ active: 1, "price.amount": 1 });
db.products.createIndex({ tags: 1 });

// Basic built-in text search example.
// In production, a dedicated search index may provide better ranking/faceting.
db.products.createIndex({
  name: "text",
  description: "text",
  tags: "text"
});

db.orders.createIndex({ orderId: 1 }, { unique: true });
db.orders.createIndex({ "customer.userId": 1, createdAt: -1 });
db.orders.createIndex({ "delivery.status": 1, createdAt: -1 });
db.orders.createIndex({ createdAt: -1 });
