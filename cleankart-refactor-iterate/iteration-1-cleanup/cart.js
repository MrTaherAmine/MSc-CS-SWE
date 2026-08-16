// Iteration 1: cleanup through naming, method extraction and separation of concerns.

const cartItems = [];

function addItem(name, price, quantity, category) {
  cartItems.push({ name, price, quantity, category });
}

function calculateSubtotal() {
  return cartItems.reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0
  );
}

function calculateDiscount(subtotal, discountType) {
  if (discountType === "student") {
    return subtotal * 0.1;
  }

  if (discountType === "vip") {
    return subtotal * 0.2;
  }

  return 0;
}

function calculateTotal(discountType) {
  const subtotal = calculateSubtotal();
  return subtotal - calculateDiscount(subtotal, discountType);
}

function printCart(discountType) {
  console.log("\nItems:");

  cartItems.forEach((item) => {
    console.log(
      `${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)}`
    );
  });

  console.log(`Total = ${calculateTotal(discountType).toFixed(2)}`);
}

function updatePrice(name, newPrice) {
  const item = cartItems.find((entry) => entry.name === name);

  if (!item) {
    throw new Error(`Item "${name}" not found.`);
  }

  item.price = newPrice;
}

addItem("Laptop", 1200, 1, "electronics");
addItem("Mouse", 30, 2, "electronics");
printCart("student");
updatePrice("Laptop", 1100);
printCart("student");
