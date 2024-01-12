# Iterator Pattern

The Iterator Pattern provides a way to sequentially access elements of an aggregate object without exposing the internal representation of the object.

The structure of the Iterator Pattern includes two hierarchical structures: Aggregate and Iterator. The aggregate object has two responsibilities: storing data and traversing data. The Iterator Pattern separates the behavior of traversing data by encapsulating it into an iterator object.

Therefore, the Iterator Pattern consists of four roles: `Abstract Iterator`, `Concrete Iterator`, `Abstract Aggregate Class`, and `Concrete Aggregate Class`.

Suppose you have an existing sales management system with an `AbstractObjectList` class responsible for storing, managing, and traversing data. This violates the Single Responsibility Principle, and there's a need to extract the method responsible for traversing data into a dedicated class to achieve separation of data storage and traversal.

1. Create an Abstract Iterator:

```typescript
export interface AbstractIterator {
  next(): void;
  isLast(): boolean;
  previous(): void;
  isFirst(): boolean;
  getNextItem(): object;
  getPreviousItem(): object;
}
```

2. Create an Abstract Aggregate Class:

```typescript
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

  // Declare the abstract factory method for creating iterator objects
  abstract createIterator(): AbstractIterator;
}
```

3. Create a Concrete Aggregate Class acting as the product data class:

```typescript
import { AbstractIterator } from "./AbstractIterator";
import { AbstractObjectList } from "./AbstractObjectList";
import { ProductIterator } from "./ProductIterator";

export class ProductList extends AbstractObjectList {
  constructor(products: Object[]) {
    super(products);
  }

  // Implement the concrete factory method for creating iterator objects
  createIterator(): AbstractIterator {
    return new ProductIterator(this);
  }
}
```

4. Create a Concrete Iterator acting as the product iterator:

```typescript
import { AbstractIterator } from "./AbstractIterator";
import { ProductList } from "./ProductList";

export class ProductIterator implements AbstractIterator {
  #products: object[];
  #cursor1: number; // The first cursor, used to track the position for forward traversal
  #cursor2: number; // The second cursor, used to track the position for backward traversal

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

5. Create a testing method:

```typescript
import { AbstractIterator } from "./AbstractIterator";
import { AbstractObjectList } from "./AbstractObjectList";
import { ProductList } from "./ProductList";

export const IteratorPatternClient = () => {
  let products: string[] = new Array<string>();
  products.push("Sword of Heaven");
  products.push("Dragon Slayer");
  products.push("Heartbreak Grass");
  products.push("Sunflower Manual");
  products.push("Forty-Two Chapters");

  let list: AbstractObjectList;
  let iterator: AbstractIterator;

  list = new ProductList(products);
  iterator = list.createIterator();

  console.log("Forward traversal");

  while (!iterator.isLast()) {
    console.log(`${iterator.getNextItem()},`);
    iterator.next();
  }

  console.log("---------------------");
  console.log("Backward traversal");

  while (!iterator.isFirst()) {
    console.log(`${iterator.getPreviousItem()},`);
    iterator.previous();
  }
};
```
