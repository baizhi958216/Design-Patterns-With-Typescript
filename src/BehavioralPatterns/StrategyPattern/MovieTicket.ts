import { Discount } from "./Discount";

export class MovieTicket {
  #price: number | undefined;
  #discount: Discount | undefined;

  setPrice(price: number): void {
    this.#price = price;
  }

  setDiscount(discount: Discount): void {
    this.#discount = discount;
  }

  getPrice(): number | undefined {
    if (this.#discount && this.#price) {
      return this.#discount.calculate(this.#price);
    }
  }
}
