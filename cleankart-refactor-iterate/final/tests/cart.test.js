import assert from "node:assert/strict";

import { ProductBuilder } from "../src/builders/ProductBuilder.js";
import { ShoppingCart } from "../src/services/ShoppingCart.js";
import { StudentDiscountStrategy } from "../src/strategies/StudentDiscountStrategy.js";
import { VipDiscountStrategy } from "../src/strategies/VipDiscountStrategy.js";

const builder = new ProductBuilder();

const product = builder
  .setId("P001")
  .setName("Laptop")
  .setPrice(1000)
  .build();

const cart = new ShoppingCart(new StudentDiscountStrategy());

cart.addProduct(product, 2);

assert.equal(cart.getSubtotal(), 2000);
assert.equal(cart.getDiscountAmount(), 200);
assert.equal(cart.getTotal(), 1800);

cart.setDiscountStrategy(new VipDiscountStrategy());

assert.equal(cart.getDiscountAmount(), 400);
assert.equal(cart.getTotal(), 1600);

cart.removeProduct("P001");
assert.equal(cart.getSubtotal(), 0);

console.log("All CleanKart tests passed.");
