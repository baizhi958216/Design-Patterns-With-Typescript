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
