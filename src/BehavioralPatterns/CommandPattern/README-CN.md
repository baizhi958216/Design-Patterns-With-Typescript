# 命令模式

将一个请求封装为一个对象，从而可用不同的请求对客户进行参数化，对请求排队或者记录请求日志，以及支持可撤销的操作。

命令模式是一种将“请求”或者说“操作”封装成一个对象的方式，这样就可以根据不同的请求存储、传递和调用它们。

因此，命令模式有 4 个角色： `抽象命令类`，`具体命令类`，`调用者`，`接收者`

现在要对宏键盘的功能键进行修改，允许用户自定义功能键的用途。

1.1. 新建退出系统模拟实现类，充当请求接收者：

```ts
export class SystemExitClass {
  exit(): void {
    console.log("退出系统！");
  }
}
```

1.2. 新建显示帮助文档模拟实现类，充当请求接收者：

```ts
export class DisplayHelpClass {
  exit(): void {
    console.log("显示帮助文档！");
  }
}
```

2. 新建抽象命令类：

```ts
export abstract class Command {
  abstract execute(): void;
}
```

3. 新建功能键类，充当请求调用者：

```ts
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
```

4.1. 新建退出命令类，充当具体命令类：

```ts
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
```

4.2. 新建帮助命令类，充当具体命令类：

```ts
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
```

5. 新建配置文件：

```json
{
  "className": "HelpCommand"
}
```

6. 新建客户端测试方法：

```ts
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
```
