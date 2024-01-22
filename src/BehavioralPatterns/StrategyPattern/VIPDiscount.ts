import { Discount } from "./Discount";

export class VIPDiscount implements Discount {
  #DISCOUNT = 0.5;
  calculate(price: number): number {
    console.log("VIP票：");
    console.log("增加积分！");
    return price * this.#DISCOUNT;
  }
}
