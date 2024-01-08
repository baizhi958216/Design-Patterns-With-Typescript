# 享元模式

将相同或者相似的对象放进称为享元池的地方来减少内存使用或计算开销，享元池里的对象称为享元对象。

享元对象又区分了内部状态和外部状态，区别是内部状态的内容不会因为外部环境的改变而改变。

运用共享技术有效地支持大量细粒度对象的复用。

因此，享元模式又 4 个角色：`抽象享元类`，`具体享元类`，`非共享具体享元类`，`享元工厂类`。

现要优化一款围棋软件，使其运行代价降低，系统性能提高。围棋的形状跟大小一样，只是出现的位置不同。

1. 新建围棋子类，充当抽象享元类：

```ts
export abstract class IgoChessman {
  abstract getColor(): void;

  display(): void {
    console.log(`棋子颜色${this.getColor()}`);
  }
}
```

2.1. 新建黑色棋子类，充当具体享元类：

```ts
import { IgoChessman } from "./IgoChessman";

export class BlackIgoChessman extends IgoChessman {
  getColor(): string {
    return "黑色";
  }
}
```

2.2. 新建白色棋子类，充当具体享元类：

```ts
import { IgoChessman } from "./IgoChessman";

export class WhiteIgoChessman extends IgoChessman {
  getColor(): string {
    return "白色";
  }
}
```

3. 新建围棋棋子工厂类，充当享元工厂类，使用单例模式对其进行设计：

```ts
import { BlackIgoChessman } from "./BlackIgoChessman";
import { IgoChessman } from "./IgoChessman";
import { WhiteIgoChessman } from "./WhiteIgoChessman";

export class IgoChessmanFactory {
  static instance: IgoChessmanFactory = new IgoChessmanFactory();
  //  享元池
  ht: Map<string, IgoChessman>;

  constructor() {
    this.ht = new Map();
    let black: IgoChessman, white: IgoChessman;
    black = new BlackIgoChessman();
    white = new WhiteIgoChessman();
    this.ht.set("b", black);
    this.ht.set("w", white);
  }

  static getInstance(): IgoChessmanFactory {
    return this.instance;
  }

  getIgoChessman(color: string): IgoChessman {
    return this.ht.get(color)!;
  }
}
```

4. 新建客户端测试方法：

```ts
import { IgoChessman } from "./IgoChessman";
import { IgoChessmanFactory } from "./IgoChessmanFactory";

export const FlyweightPatternClient = () => {
  let black1: IgoChessman,
    black2: IgoChessman,
    black3: IgoChessman,
    white1: IgoChessman,
    white2: IgoChessman;
  let factory: IgoChessmanFactory;

  factory = IgoChessmanFactory.getInstance();

  black1 = factory.getIgoChessman("b");
  black2 = factory.getIgoChessman("b");
  black3 = factory.getIgoChessman("b");
  console.log(`判断两颗黑子是否相同：${black1 === black2}`);

  white1 = factory.getIgoChessman("w");
  white2 = factory.getIgoChessman("w");
  console.log(`判断两颗白子是否相同：${white1 === white2}`);

  black1.display();
  black2.display();
  black3.display();
  white1.display();
  white2.display();
};
```
