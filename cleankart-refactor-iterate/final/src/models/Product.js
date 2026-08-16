export class Product {
  constructor({ id, name, price, category, description }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  setPrice(newPrice) {
    if (newPrice < 0) {
      throw new Error("Price cannot be negative.");
    }

    const oldPrice = this.price;
    this.price = newPrice;

    if (newPrice < oldPrice) {
      this.notifyObservers(oldPrice, newPrice);
    }
  }

  notifyObservers(oldPrice, newPrice) {
    this.observers.forEach((observer) =>
      observer.update(this, oldPrice, newPrice)
    );
  }
}
