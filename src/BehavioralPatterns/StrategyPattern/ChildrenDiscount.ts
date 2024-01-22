import { Discount } from "./Discount";

export class ChildrenDiscount implements Discount {
  #DISCOUNT: number = 10;

  calculate(price: number): number {
    console.log("儿童票：");
    if (price >= 20) {
      return price - this.#DISCOUNT;
    } else {
      return price;
    }
  }
}
