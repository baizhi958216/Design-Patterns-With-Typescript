import { AbstractIterator } from "./AbstractIterator";
import { ProductList } from "./ProductList";

export class ProductIterator implements AbstractIterator {
  #products: object[];
  #cursor1: number; //第一个游标，用于记录正向遍历的位置
  #cursor2: number; //第二个游标，用于记录逆向遍历的位置

  constructor(products: ProductList) {
    this.#products = products.getObjects();
    this.#cursor1 = 0;
    this.#cursor2 = this.#products.length - 1;
  }

  next(): void {
    if (this.#cursor1 < this.#products.length) {
      this.#cursor1++;
    }
  }

  isFirst(): boolean {
    return this.#cursor2 === -1;
  }

  isLast(): boolean {
    return this.#cursor1 === this.#products.length;
  }

  previous(): void {
    if (this.#cursor2 > -1) {
      this.#cursor2--;
    }
  }

  getNextItem(): object {
    return this.#products[this.#cursor1];
  }

  getPreviousItem(): object {
    return this.#products[this.#cursor2];
  }
}
