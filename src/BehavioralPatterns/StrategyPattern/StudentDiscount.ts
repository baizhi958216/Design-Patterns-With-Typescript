import { Discount } from "./Discount";

export class StudentDiscount implements Discount {
  private DISCOUNT: number = 0.8;
  calculate(price: number): number {
    console.log("学生票：");
    return price * this.DISCOUNT;
  }
}
