import { AbstractNode } from "./AbstractNode";

export class ActionNode extends AbstractNode {
  #action: string;

  constructor(action: string) {
    super();
    this.#action = action;
  }

  interpret(): string {
    const _action = this.#action.toLowerCase();
    if (_action === "move") {
      return "移动";
    } else if (_action === "run") {
      return "快速移动";
    } else {
      return "无效指令";
    }
  }
}
