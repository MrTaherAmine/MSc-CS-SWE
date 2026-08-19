// Batch example: create daily product sales from completed orders.
// In production this may run incrementally using events/change streams.

db.orders.aggregate([
  {
    $match: {
      "delivery.status": { $in: ["delivered", "shipped"] },
      createdAt: {
        $gte: ISODate("2026-08-19T00:00:00Z"),
        $lt: ISODate("2026-08-20T00:00:00Z")
      }
    }
  },
  { $unwind: "$items" },
  {
    $group: {
      _id: {
        date: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt"
          }
        },
        productId: "$items.productId"
      },
      sku: { $first: "$items.sku" },
      productName: { $first: "$items.name" },
      unitsSold: { $sum: "$items.quantity" },
      grossRevenue: {
        $sum: {
          $multiply: ["$items.quantity", "$items.unitPrice"]
        }
      },
      orderIds: { $addToSet: "$orderId" },
      totalUnitPrice: { $sum: "$items.unitPrice" },
      lineCount: { $sum: 1 }
    }
  },
  {
    $set: {
      orderCount: { $size: "$orderIds" },
      averageUnitPrice: {
        $cond: [
          { $gt: ["$lineCount", 0] },
          { $divide: ["$totalUnitPrice", "$lineCount"] },
          0
        ]
      },
      updatedAt: "$$NOW"
    }
  },
  {
    $unset: ["orderIds", "totalUnitPrice", "lineCount"]
  },
  {
    $merge: {
      into: "daily_product_sales",
      on: "_id",
      whenMatched: "replace",
      whenNotMatched: "insert"
    }
  }
]);
