# 迭代器模式

提供一种方法顺序访问一个聚合对象中的各个元素，而又不用暴露该对象的内部表示。

迭代器模式结构包含聚合和迭代器两个层次结构，聚合对象有两个职责，存储数据和遍历数据，迭代器模式将遍历数据的行为分离出来封装到迭代器对象中。

因此，迭代器模式包含
4 个角色：`抽象迭代器`，`具体迭代器`，`抽象聚合类`，`具体聚合类`

现有一套销售管理系统，有个`AbstractObjectList`类负责存储、管理、遍历数据，违反了单一职责原则，需要将负责遍历数据的方法提取到专门的类中，实现数据存储、遍历分离。

1. 新建抽象迭代器：

```ts
export interface AbstractIterator {
  next(): void;
  isLast(): boolean;
  previous(): void;
  isFirst(): boolean;
  getNextItem(): object;
  getPreviousItem(): object;
}
```

2. 新建抽象聚合类：

```ts
import { AbstractIterator } from "./AbstractIterator";

export abstract class AbstractObjectList {
  protected objects: Array<Object> = new Array<Object>();

  constructor(objects: Object[]) {
    this.objects = objects;
  }

  addObject(obj: Object): void {
    this.objects.push(obj);
  }

  removeObject(obj: Object): void {
    this.objects.splice(this.objects.indexOf(obj), 1);
  }

  getObjects(): Object[] {
    return this.objects;
  }

  // 声明创建迭代器对象的抽象工厂方法
  abstract createIterator(): AbstractIterator;
}
```

3. 新建商品数据类，充当具体聚合类：

```ts
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
```

4. 新建商品迭代器，充当具体迭代器：

```ts
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
```

5. 新建测试方法：

```ts
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
```
