// 1. Browse active products by category.
db.products.find({
  "category.id": "computers",
  active: true
}).sort({ "price.amount": 1 }).limit(50);

// 2. Basic product text search.
db.products.find(
  { $text: { $search: "business laptop" }, active: true },
  { score: { $meta: "textScore" }, name: 1, price: 1, inventory: 1 }
).sort({ score: { $meta: "textScore" } }).limit(20);

// 3. Customer order history.
db.orders.find({
  "customer.userId": ObjectId("64f000000000000000000001")
}).sort({ createdAt: -1 }).limit(50);

// 4. Delivery operations queue.
db.orders.find({
  "delivery.status": { $in: ["processing", "shipped"] }
}).sort({ createdAt: 1 }).limit(200);

// 5. Fast analytics from a pre-aggregated collection.
db.daily_product_sales.find({
  "_id.date": { $gte: "2026-08-01", $lte: "2026-08-31" }
}).sort({ grossRevenue: -1 }).limit(20);
