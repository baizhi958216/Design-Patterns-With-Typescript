import { Command } from "./Command";
import { SystemExitClass } from "./SystemExitClass";

export class ExitCommand extends Command {
  #seObj: SystemExitClass;

  constructor() {
    super();
    this.#seObj = new SystemExitClass();
  }

  execute(): void {
    this.#seObj.exit();
  }
}
