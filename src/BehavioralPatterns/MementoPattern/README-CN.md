# 备忘录模式

让系统恢复到某一特定的历史状态（Ctrl+z），备忘录模式提供一种状态恢复的实现机制。

在不破坏封装的前提下捕获一个对象的内部状态，并在该对象之外保存这个状态，这样可以在以后将对象恢复到原先保存的状态。

因此，备忘录模式有 3 个角色：`原发器`，`备忘录`，`负责人`

现有一个象棋游戏，实现`悔棋`功能。

1. 新建象棋棋子备忘录类，充当备忘录：

```ts
export class ChessmanMemento {
  private label: string;
  private x: number;
  private y: number;

  constructor(label: string = "", x: number = 0, y: number = 0) {
    this.label = label;
    this.x = x;
    this.y = y;
  }

  setLabel(label: string): void {
    this.label = label;
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  getLabel(): string {
    return this.label;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }
}
```

2. 新建象棋棋子类，充当原发器：

```ts
import { ChessmanMemento } from "./ChessmanMemento";

export class Chessman {
  private label: string;
  private x: number;
  private y: number;

  constructor(label: string, x: number, y: number) {
    this.label = label;
    this.x = x;
    this.y = y;
  }

  setLabel(label: string): void {
    this.label = label;
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  getLabel(): string {
    return this.label;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  // 保存状态
  save(): ChessmanMemento {
    return new ChessmanMemento(this.label, this.x, this.y);
  }

  // 恢复状态
  restore(memento: ChessmanMemento): void {
    this.label = memento.getLabel();
    this.x = memento.getX();
    this.y = memento.getY();
  }
}
```

3. 新建象棋棋子备忘录管理类，充当负责人：

```ts
import { ChessmanMemento } from "./ChessmanMemento";

export class MementoCaretaker {
  private memento: ChessmanMemento;

  constructor() {
    this.memento = new ChessmanMemento();
  }

  getMemento(): ChessmanMemento {
    return this.memento;
  }

  setMemento(memento: ChessmanMemento) {
    this.memento = memento;
  }
}
```

4. 新建客户端测试函数：

```ts
import { Chessman } from "./Chessman";
import { MementoCaretaker } from "./MementoCaretaker";

export const MementoPatternClient = () => {
  const mc: MementoCaretaker = new MementoCaretaker();
  const chess: Chessman = new Chessman("車", 1, 1);
  display(chess);
  mc.setMemento(chess.save()); //保存状态
  chess.setY(4);
  display(chess);
  mc.setMemento(chess.save()); //保存状态
  chess.setX(5);
  display(chess);
  console.log("****** 悔棋 ******");
  chess.restore(mc.getMemento());
  display(chess);
};

const display = (chess: Chessman) => {
  console.log(
    `棋子"${chess.getLabel()}"当前位置为：第${chess.getX()}行第${chess.getY()}列。`
  );
};
```
