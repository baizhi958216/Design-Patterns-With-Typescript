# Memento Pattern

The Memento pattern allows a system to restore to a specific historical state (Ctrl+z), providing a mechanism for state recovery.

It captures the internal state of an object without violating encapsulation and saves this state outside the object. This way, the object can be restored to its previously saved state later on.

Therefore, the Memento pattern involves three roles: the `Originator`, the `Memento`, and the `Caretaker`.

Let's consider a chess game and implement the "Undo" functionality.

1. Create a ChessmanMemento class to act as the Memento:

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

2. Create a Chessman class to act as the Originator:

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

  // Save state
  save(): ChessmanMemento {
    return new ChessmanMemento(this.label, this.x, this.y);
  }

  // Restore state
  restore(memento: ChessmanMemento): void {
    this.label = memento.getLabel();
    this.x = memento.getX();
    this.y = memento.getY();
  }
}
```

3. Create a MementoCaretaker class to act as the Caretaker:

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

4. Create a client test function:

```ts
import { Chessman } from "./Chessman";
import { MementoCaretaker } from "./MementoCaretaker";

export const MementoPatternClient = () => {
  const mc: MementoCaretaker = new MementoCaretaker();
  const chess: Chessman = new Chessman("車", 1, 1);
  display(chess);
  mc.setMemento(chess.save()); // Save state
  chess.setY(4);
  display(chess);
  mc.setMemento(chess.save()); // Save state
  chess.setX(5);
  display(chess);
  console.log("****** Undo ******");
  chess.restore(mc.getMemento());
  display(chess);
};

const display = (chess: Chessman) => {
  console.log(
    `Chess piece "${chess.getLabel()}" is currently at: Row ${chess.getX()}, Column ${chess.getY()}.`
  );
};
```
