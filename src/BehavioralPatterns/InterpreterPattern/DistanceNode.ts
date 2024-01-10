import { AbstractNode } from "./AbstractNode";

export class DistanceNode extends AbstractNode {
  #distance: string;
  constructor(distance: string) {
    super();
    this.#distance = distance;
  }

  interpret(): string {
    return this.#distance;
  }
}
