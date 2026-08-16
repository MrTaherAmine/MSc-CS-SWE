import { Observer } from "./Observer.js";

export class PriceDropObserver extends Observer {
  constructor(customerName) {
    super();
    this.customerName = customerName;
  }

  update(product, oldPrice, newPrice) {
    console.log(
      `[Price Drop -> ${this.customerName}] ${product.name}: ${oldPrice.toFixed(2)} -> ${newPrice.toFixed(2)}`
    );
  }
}
