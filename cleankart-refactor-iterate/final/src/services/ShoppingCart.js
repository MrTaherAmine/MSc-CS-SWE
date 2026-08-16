import { NoDiscountStrategy } from "../strategies/NoDiscountStrategy.js";

export class ShoppingCart {
  constructor(discountStrategy = new NoDiscountStrategy()) {
    this.items = [];
    this.discountStrategy = discountStrategy;
  }

  addProduct(product, quantity = 1) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }

    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      return;
    }

    this.items.push({ product, quantity });
  }

  removeProduct(productId) {
    this.items = this.items.filter(
      (item) => item.product.id !== productId
    );
  }

  clear() {
    this.items = [];
  }

  setDiscountStrategy(strategy) {
    this.discountStrategy = strategy;
  }

  getSubtotal() {
    return this.items.reduce(
      (subtotal, item) =>
        subtotal + item.product.price * item.quantity,
      0
    );
  }

  getDiscountAmount() {
    return this.discountStrategy.calculate(this.getSubtotal());
  }

  getTotal() {
    return this.getSubtotal() - this.getDiscountAmount();
  }

  getSummary() {
    return {
      items: this.items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        lineTotal: item.product.price * item.quantity
      })),
      subtotal: this.getSubtotal(),
      discount: this.getDiscountAmount(),
      total: this.getTotal()
    };
  }
}
