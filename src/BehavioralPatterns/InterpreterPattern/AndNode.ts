import { AbstractNode } from "./AbstractNode";

export class AndNode extends AbstractNode {
  #left: AbstractNode;
  #right: AbstractNode;

  constructor(left: AbstractNode, right: AbstractNode) {
    super();
    this.#left = left;
    this.#right = right;
  }

  interpret(): string {
    return this.#left.interpret() + "再" + this.#right.interpret();
  }
}
