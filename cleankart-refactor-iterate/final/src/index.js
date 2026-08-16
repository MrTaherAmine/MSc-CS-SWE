import { ProductBuilder } from "./builders/ProductBuilder.js";
import { PriceDropObserver } from "./observers/PriceDropObserver.js";
import { ShoppingCart } from "./services/ShoppingCart.js";
import { StudentDiscountStrategy } from "./strategies/StudentDiscountStrategy.js";
import { VipDiscountStrategy } from "./strategies/VipDiscountStrategy.js";

const builder = new ProductBuilder();

const laptop = builder
  .setId("P001")
  .setName("Laptop")
  .setPrice(1200)
  .setCategory("electronics")
  .setDescription("High-performance developer laptop")
  .build();

const mouse = builder
  .setId("P002")
  .setName("Mouse")
  .setPrice(30)
  .setCategory("electronics")
  .setDescription("Wireless ergonomic mouse")
  .build();

const customerObserver = new PriceDropObserver("Taher");
laptop.addObserver(customerObserver);

const cart = new ShoppingCart(new StudentDiscountStrategy());

cart.addProduct(laptop, 1);
cart.addProduct(mouse, 2);

console.log("\n=== Student Cart ===");
console.table(cart.getSummary().items);
console.log(cart.getSummary());

cart.setDiscountStrategy(new VipDiscountStrategy());

console.log("\n=== VIP Cart ===");
console.log(cart.getSummary());

console.log("\n=== Simulating Price Drop ===");
laptop.setPrice(1050);

console.log("\n=== Updated Cart ===");
console.log(cart.getSummary());
