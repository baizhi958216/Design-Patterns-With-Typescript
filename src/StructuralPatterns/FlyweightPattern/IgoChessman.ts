export abstract class IgoChessman {
  abstract getColor(): void;

  display(): void {
    console.log(`棋子颜色：${this.getColor()}`);
  }
}
