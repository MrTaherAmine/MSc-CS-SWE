import { DiscountStrategy } from "./DiscountStrategy.js";

export class StudentDiscountStrategy extends DiscountStrategy {
  calculate(subtotal) {
    return subtotal * 0.1;
  }
}
