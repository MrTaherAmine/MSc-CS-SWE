import { DiscountStrategy } from "./DiscountStrategy.js";

export class NoDiscountStrategy extends DiscountStrategy {
  calculate() {
    return 0;
  }
}
