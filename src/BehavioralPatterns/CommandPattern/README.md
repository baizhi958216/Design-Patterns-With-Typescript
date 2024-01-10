# Command Pattern

The Command Pattern involves encapsulating a request as an object, allowing parameterization of clients with different requests, queuing of requests, and logging of the requests. It also supports undoable operations.

The Command Pattern is a way of encapsulating "requests" or "operations" as objects, enabling their storage, transmission, and invocation based on different requests.

Therefore, the Command Pattern consists of four roles: `Abstract Command Class`, `Concrete Command Class`, `Invoker`, and `Receiver`.

We are currently modifying the functionality keys of a macro keyboard to allow users to customize the purpose of the function keys.

1.1. Create a simulated implementation class for exiting the system, acting as the command receiver:

```ts
export class SystemExitClass {
  exit(): void {
    console.log("Exiting the system!");
  }
}
```

1.2. Create a simulated implementation class for displaying help documentation, acting as the command receiver:

```ts
export class DisplayHelpClass {
  display(): void {
    console.log("Displaying help documentation!");
  }
}
```

2. Create an abstract command class:

```ts
export abstract class Command {
  abstract execute(): void;
}
```

3. Create a function button class, acting as the command invoker:

```ts
import { Command } from "./Command";

export class FunctionButton {
  #command: Command | undefined;

  // Inject a command for the function button
  setCommand(command: Command): void {
    this.#command = command;
  }

  // Method for sending requests
  click(): void {
    console.log("Clicking the function button:");
    if (this.#command) {
      this.#command.execute();
    } else {
      console.log("Function key not set!");
    }
  }
}
```

4.1. Create an exit command class, acting as a concrete command:

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

4.2. Create a help command class, acting as a concrete command:

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

5. Create a configuration file:

```json
{
  "className": "HelpCommand"
}
```

6. Create a client testing method:

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
