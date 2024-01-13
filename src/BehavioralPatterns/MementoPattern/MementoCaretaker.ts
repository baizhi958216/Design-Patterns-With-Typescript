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
