import { AbstractNode } from "./AbstractNode";

export class DirectionNode extends AbstractNode {
  #direction: string;
  constructor(direction: string) {
    super();
    this.#direction = direction;
  }

  interpret(): string {
    const _direction = this.#direction.toLowerCase();
    if (_direction === "up") {
      return "向上";
    } else if (_direction === "down") {
      return "向下";
    } else if (_direction === "left") {
      return "向左";
    } else if (_direction === "right") {
      return "向右";
    } else {
      return "无效指令";
    }
  }
}
