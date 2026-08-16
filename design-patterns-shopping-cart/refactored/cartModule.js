// Part 2 - Refactored using the Module Pattern.
//
// The cart data is private inside the closure.
// Only the public methods returned from the module can modify it.
const ShoppingCart = (() => {
  let cart = [];

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

  function removeItem(name) {
    cart = cart.filter((item) => item.name !== name);
  }

  function clearCart() {
    cart = [];
  }

  function calculateTotal() {
    return cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }

  function getItems() {
    // Return a copy so external code cannot directly mutate private cart state.
    return cart.map((item) => ({ ...item }));
  }

  function viewCart() {
    console.log("\n=== Module Pattern Shopping Cart ===");

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

  return {
    addItem,
    removeItem,
    clearCart,
    viewCart,
    getItems,
    calculateTotal
  };
})();

// Demonstration.
ShoppingCart.addItem("Apple", 2, 1.5);
ShoppingCart.addItem("Orange", 3, 2.0);
ShoppingCart.viewCart();

ShoppingCart.removeItem("Apple");
ShoppingCart.viewCart();

ShoppingCart.clearCart();
ShoppingCart.viewCart();
