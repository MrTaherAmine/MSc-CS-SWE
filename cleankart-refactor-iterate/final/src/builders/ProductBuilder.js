import { Product } from "../models/Product.js";

export class ProductBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.productData = {
      id: null,
      name: "",
      price: 0,
      category: "general",
      description: ""
    };

    return this;
  }

  setId(id) {
    this.productData.id = id;
    return this;
  }

  setName(name) {
    this.productData.name = name;
    return this;
  }

  setPrice(price) {
    this.productData.price = price;
    return this;
  }

  setCategory(category) {
    this.productData.category = category;
    return this;
  }

  setDescription(description) {
    this.productData.description = description;
    return this;
  }

  build() {
    if (!this.productData.id || !this.productData.name) {
      throw new Error("Product id and name are required.");
    }

    if (this.productData.price < 0) {
      throw new Error("Product price cannot be negative.");
    }

    const product = new Product({ ...this.productData });
    this.reset();
    return product;
  }
}
