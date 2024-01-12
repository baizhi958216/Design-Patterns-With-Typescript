import { AbstractIterator } from "./AbstractIterator";
import { AbstractObjectList } from "./AbstractObjectList";
import { ProductIterator } from "./ProductIterator";

export class ProductList extends AbstractObjectList {
  constructor(products: Object[]) {
    super(products);
  }

  // 实现创建迭代器对象的具体工厂方法
  createIterator(): AbstractIterator {
    return new ProductIterator(this);
  }
}
