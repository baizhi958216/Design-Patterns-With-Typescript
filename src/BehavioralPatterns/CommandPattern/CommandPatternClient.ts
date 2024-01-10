import { Command } from "./Command";
import { FunctionButton } from "./FunctionButton";
import { className } from "./config.json";

export const CommandPatternClient = async () => {
  const fb = new FunctionButton();
  let command: Command;

  const module = await import(`./${className}`);
  command = new module[className]();

  fb.setCommand(command);
  fb.click();
};
