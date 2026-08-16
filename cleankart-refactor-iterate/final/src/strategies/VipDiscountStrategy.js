import { DiscountStrategy } from "./DiscountStrategy.js";

export class VipDiscountStrategy extends DiscountStrategy {
  calculate(subtotal) {
    return subtotal * 0.2;
  }
}
