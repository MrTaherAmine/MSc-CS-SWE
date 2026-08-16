// Part 1 - Procedural Programming
// Global variable used to store all shopping cart items.
let cart = [];

// Adds an item to the cart.
// If the item already exists, its quantity is increased.
function addItem(name, quantity, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += quantity;
    return;
  }

  cart.push({
    name,
    quantity,
    price
  });
}

// Removes the first item matching the given name.
function removeItem(name) {
  cart = cart.filter((item) => item.name !== name);
}

// Clears the entire cart.
function clearCart() {
  cart = [];
}

// Calculates the total value of all cart items.
function calculateTotal() {
  return cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
}

// Displays every item and the total price.
function viewCart() {
  console.log("\n=== Procedural Shopping Cart ===");

  if (cart.length === 0) {
    console.log("Cart is empty.");
    console.log("Total: 0.00 TND");
    return;
  }

  cart.forEach((item) => {
    const lineTotal = item.quantity * item.price;

    console.log(
      `${item.name} (x${item.quantity}) - ${lineTotal.toFixed(2)} TND`
    );
  });

  console.log(`Total: ${calculateTotal().toFixed(2)} TND`);
}

// Demonstration matching the assignment example.
addItem("Apple", 2, 1.5);
addItem("Orange", 3, 2.0);
viewCart();

removeItem("Apple");
viewCart();

clearCart();
viewCart();
