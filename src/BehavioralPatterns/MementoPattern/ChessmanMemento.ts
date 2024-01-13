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
