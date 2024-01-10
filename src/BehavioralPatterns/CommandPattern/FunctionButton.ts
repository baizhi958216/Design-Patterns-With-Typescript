import { Command } from "./Command";

export class FunctionButton {
  #command: Command | undefined;

  // 为功能键注入命令
  setCommand(command: Command): void {
    this.#command = command;
  }

  // 发送请求的方法
  click(): void {
    console.log("单击功能键：");
    if (this.#command) {
      this.#command.execute();
    } else {
      console.log("未设置功能键！");
    }
  }
}
