import { AbstractNode } from "./AbstractNode";

export class SentenceNode extends AbstractNode {
  #direction: AbstractNode;
  #action: AbstractNode;
  #distance: AbstractNode;

  constructor(
    direction: AbstractNode,
    action: AbstractNode,
    distance: AbstractNode
  ) {
    super();
    this.#direction = direction;
    this.#action = action;
    this.#distance = distance;
  }

  interpret(): string {
    return (
      this.#direction.interpret() +
      this.#action.interpret() +
      this.#distance.interpret()
    );
  }
}
