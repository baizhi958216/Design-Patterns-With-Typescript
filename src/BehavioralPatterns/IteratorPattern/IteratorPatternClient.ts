import { AbstractIterator } from "./AbstractIterator";
import { AbstractObjectList } from "./AbstractObjectList";
import { ProductList } from "./ProductList";

export const IteratorPatternClient = () => {
  let products: string[] = new Array<string>();
  products.push("倚天剑");
  products.push("屠龙刀");
  products.push("断肠草");
  products.push("葵花宝典");
  products.push("四十二章经");

  let list: AbstractObjectList;
  let iterator: AbstractIterator;

  list = new ProductList(products);
  iterator = list.createIterator();

  console.log("正向遍历");

  while (!iterator.isLast()) {
    console.log(`${iterator.getNextItem()}，`);
    iterator.next();
  }

  console.log("---------------------");
  console.log("逆向遍历");

  while (!iterator.isFirst()) {
    console.log(`${iterator.getPreviousItem()}，`);
    iterator.previous();
  }
};
