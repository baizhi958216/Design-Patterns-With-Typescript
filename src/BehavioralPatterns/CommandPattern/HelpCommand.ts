import { Command } from "./Command";
import { DisplayHelpClass } from "./DisplayHelpClass";

export class HelpCommand extends Command {
  #hcObj: DisplayHelpClass;

  constructor() {
    super();
    this.#hcObj = new DisplayHelpClass();
  }

  execute(): void {
    this.#hcObj.display();
  }
}
