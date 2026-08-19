// Refactored operational and analytics indexes.

db.products.createIndex({ sku: 1 }, { unique: true });
db.products.createIndex({ "category.id": 1, active: 1 });
db.products.createIndex({ tags: 1 });

db.orders.createIndex({ orderId: 1 }, { unique: true });
db.orders.createIndex({ "customer.userId": 1, createdAt: -1 });
db.orders.createIndex({ "delivery.status": 1, createdAt: -1 });
db.orders.createIndex({ createdAt: -1 });

db.daily_product_sales.createIndex({
  "_id.date": -1,
  categoryId: 1,
  grossRevenue: -1
});

db.daily_product_sales.createIndex({
  "_id.productId": 1,
  "_id.date": -1
});

db.daily_category_sales.createIndex({
  "_id.date": -1,
  grossRevenue: -1
});
