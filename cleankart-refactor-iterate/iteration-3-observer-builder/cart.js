// Iteration 3: adds Observer and Builder Patterns.

class Product {
  constructor({ name, price, category, description }) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  setPrice(newPrice) {
    const oldPrice = this.price;
    this.price = newPrice;

    if (newPrice < oldPrice) {
      this.observers.forEach((observer) =>
        observer.update(this, oldPrice, newPrice)
      );
    }
  }
}

class ProductBuilder {
  constructor() {
    this.product = {
      name: "",
      price: 0,
      category: "general",
      description: ""
    };
  }

  setName(name) {
    this.product.name = name;
    return this;
  }

  setPrice(price) {
    this.product.price = price;
    return this;
  }

  setCategory(category) {
    this.product.category = category;
    return this;
  }

  setDescription(description) {
    this.product.description = description;
    return this;
  }

  build() {
    return new Product(this.product);
  }
}

class PriceDropObserver {
  constructor(customerName) {
    this.customerName = customerName;
  }

  update(product, oldPrice, newPrice) {
    console.log(
      `[Price Drop -> ${this.customerName}] ${product.name}: ${oldPrice} -> ${newPrice}`
    );
  }
}

const laptop = new ProductBuilder()
  .setName("Laptop")
  .setPrice(1200)
  .setCategory("electronics")
  .setDescription("Developer laptop")
  .build();

laptop.addObserver(new PriceDropObserver("Taher"));
laptop.setPrice(1050);
