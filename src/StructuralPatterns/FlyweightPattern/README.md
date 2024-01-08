# Flyweight Pattern

The Flyweight Pattern involves placing similar or identical objects into a shared pool to reduce memory usage or computational costs. The objects within the pool are referred to as flyweight objects.

Flyweight objects are further categorized into internal and external states. The key distinction is that changes in the external environment do not affect the content of internal states.

This pattern efficiently supports the reuse of a large number of fine-grained objects through shared technology.

Therefore, the Flyweight Pattern involves four roles: `AbstractFlyweight Class`, `ConcreteFlyweight Class`, `UnsharedConcreteFlyweight Class`, and `FlyweightFactory Class`.

Now, let's optimize a Go software to reduce operational costs and enhance system performance. The shape and size of Go pieces are the same; only their positions differ.

1. Create a new GoPiece class to act as the abstract flyweight class:

```ts
export abstract class IgoChessman {
  abstract getColor(): void;

  display(): void {
    console.log(`Piece color: ${this.getColor()}`);
  }
}
```

2.1. Create a BlackGoPiece class to act as the concrete flyweight class:

```ts
import { IgoChessman } from "./IgoChessman";

export class BlackIgoChessman extends IgoChessman {
  getColor(): string {
    return "Black";
  }
}
```

2.2. Create a WhiteGoPiece class to act as the concrete flyweight class:

```ts
import { IgoChessman } from "./IgoChessman";

export class WhiteIgoChessman extends IgoChessman {
  getColor(): string {
    return "White";
  }
}
```

3. Create a GoPieceFactory class to act as the flyweight factory class, using the singleton pattern:

```ts
import { BlackIgoChessman } from "./BlackIgoChessman";
import { IgoChessman } from "./IgoChessman";
import { WhiteIgoChessman } from "./WhiteIgoChessman";

export class IgoChessmanFactory {
  static instance: IgoChessmanFactory = new IgoChessmanFactory();
  // Flyweight pool
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

4. Create a client test method:

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
  console.log(`Are two black pieces the same: ${black1 === black2}`);

  white1 = factory.getIgoChessman("w");
  white2 = factory.getIgoChessman("w");
  console.log(`Are two white pieces the same: ${white1 === white2}`);

  black1.display();
  black2.display();
  black3.display();
  white1.display();
  white2.display();
};
```
