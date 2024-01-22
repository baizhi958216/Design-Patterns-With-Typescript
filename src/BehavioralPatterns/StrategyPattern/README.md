# Strategy Pattern

The Strategy pattern defines a series of algorithms, encapsulates each algorithm, and makes them interchangeable. The Strategy pattern allows the algorithms to vary independently of the clients that use them.

To implement a specific functionality, the Strategy pattern defines a set of independent classes to encapsulate different algorithms. It separates the responsibility of the algorithm from the algorithm itself and delegates it to different objects for management. It also provides an abstract class for algorithm declaration.

Therefore, the Strategy pattern consists of three roles: the `Context` class, the `Abstract Strategy` class, and the `Concrete Strategy` class.

Develop a ticketing system with the following requirements: students receive a 20% discount, children under 10 years old get a $10 discount on tickets priced over $20, VIP customers receive a 50% discount and earn loyalty points, which can be redeemed for gifts.

1. Create a `MovieTicket` class to act as the Context class:

```ts
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
```

2. Create a `Discount` interface to act as the Abstract Strategy class:

```ts
export interface Discount {
  calculate(price: number): number;
}
```

3. Create a `StudentDiscount` class to act as a Concrete Strategy class for student discounts:

```ts
import { Discount } from "./Discount";

export class StudentDiscount implements Discount {
  private DISCOUNT: number = 0.8;
  calculate(price: number): number {
    console.log("Student discount:");
    return price * this.DISCOUNT;
  }
}
```

4. Create a `VIPDiscount` class to act as a Concrete Strategy class for VIP customer discounts:

```ts
import { Discount } from "./Discount";

export class VIPDiscount implements Discount {
  #DISCOUNT = 0.5;
  calculate(price: number): number {
    console.log("VIP discount:");
    console.log("Earn loyalty points!");
    return price * this.#DISCOUNT;
  }
}
```

5. Create a `ChildrenDiscount` class to act as a Concrete Strategy class for children's ticket discounts:

```ts
import { Discount } from "./Discount";

export class ChildrenDiscount implements Discount {
  #DISCOUNT: number = 10;

  calculate(price: number): number {
    console.log("Children's discount:");
    if (price >= 20) {
      return price - this.#DISCOUNT;
    } else {
      return price;
    }
  }
}
```

6. config.json

```json
{
  "config": "StudentDiscount"
}
```

7. Create a client test function:

```ts
import { Discount } from "./Discount";
import { MovieTicket } from "./MovieTicket";
import { config } from "./config.json";

export const StrategyPatternClient = async () => {
  const mt: MovieTicket = new MovieTicket();
  const originalPrice: number = 60.0;
  let currentPrice: number | undefined;

  mt.setPrice(originalPrice);
  console.log(`Original price: ${originalPrice}`);
  console.log("------------------------");

  const currentDiscount = await import(`./${config}`);

  const discount: Discount = new currentDiscount[config]();

  mt.setDiscount(discount);

  currentPrice = mt.getPrice();
  console.log(`Discounted price: ${currentPrice}`);
};
```
