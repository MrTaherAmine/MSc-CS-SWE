// Iteration 2: Strategy Pattern removes discount conditionals.

class NoDiscountStrategy {
  calculate(subtotal) {
    return 0;
  }
}

class StudentDiscountStrategy {
  calculate(subtotal) {
    return subtotal * 0.1;
  }
}

class VipDiscountStrategy {
  calculate(subtotal) {
    return subtotal * 0.2;
  }
}

class ShoppingCart {
  constructor(discountStrategy = new NoDiscountStrategy()) {
    this.items = [];
    this.discountStrategy = discountStrategy;
  }

  addItem(item) {
    this.items.push(item);
  }

  setDiscountStrategy(strategy) {
    this.discountStrategy = strategy;
  }

  calculateSubtotal() {
    return this.items.reduce(
      (subtotal, item) => subtotal + item.price * item.quantity,
      0
    );
  }

  calculateTotal() {
    const subtotal = this.calculateSubtotal();
    return subtotal - this.discountStrategy.calculate(subtotal);
  }
}

const cart = new ShoppingCart(new StudentDiscountStrategy());

cart.addItem({ name: "Laptop", price: 1200, quantity: 1 });
cart.addItem({ name: "Mouse", price: 30, quantity: 2 });

console.log("Student total:", cart.calculateTotal());

cart.setDiscountStrategy(new VipDiscountStrategy());
console.log("VIP total:", cart.calculateTotal());
