# 策略模式

定义一系列算法，将每一个算法封装起来，并让他们可以相互替换。策略模式让算法可以独立于使用它的客户而变化。

为实现某个功能，策略模式定义一些独立的类来封装不同的算法，把算法和算法的责任分割，委派给不同的对象管理，还提供一个抽象的类来做算法声明。

因此，策略模式包含 3 个角色：`环境类`，`抽象策略类`，`具体策略类`。

现在要开发一套售票系统，学生打 8 折；10 岁以下为大于 20 元的票减 10 元；vip 半价还可以积分，积分可以换礼品。

1. 新建电影票类，充当环境类。

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

2. 新建折扣类，充当抽象策略类：

```ts
export interface Discount {
  calculate(price: number): number;
}
```

3. 新建学生票折扣类，充当具体策略类：

```ts
import { Discount } from "./Discount";

export class StudentDiscount implements Discount {
  private DISCOUNT: number = 0.8;
  calculate(price: number): number {
    console.log("学生票：");
    return price * this.DISCOUNT;
  }
}
```

4. 新建会员票折扣类，充当具体策略类：

```ts
import { Discount } from "./Discount";

export class VIPDiscount implements Discount {
  #DISCOUNT = 0.5;
  calculate(price: number): number {
    console.log("VIP票：");
    console.log("增加积分！");
    return price * this.#DISCOUNT;
  }
}
```

5. 新建儿童票折扣类，充当具体策略类：

```ts
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
```

6. config.json

```json
{
  "config": "StudentDiscount"
}
```

7. 新建客户端测试函数：

```ts
import { Discount } from "./Discount";
import { MovieTicket } from "./MovieTicket";
import { config } from "./config.json";

export const StrategyPatternClient = async () => {
  const mt: MovieTicket = new MovieTicket();
  const originalPrice: number = 60.0;
  let currentPrice: number | undefined;

  mt.setPrice(originalPrice);
  console.log(`原始价格为${originalPrice}`);
  console.log("------------------------");

  const currentDiscount = await import(`./${config}`);

  const discount: Discount = new currentDiscount[config]();

  mt.setDiscount(discount);

  currentPrice = mt.getPrice();
  console.log(`折后价为${currentPrice}`);
};
```
