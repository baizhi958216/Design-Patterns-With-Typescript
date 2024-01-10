# Interpreter Pattern

The Interpreter Pattern is used to describe how to build a simple language interpreter, primarily applied in the design of interpreters using object-oriented languages. It is useful when developing a new language, as it provides a framework for language interpretation.

Given a language, define a representation of its grammar and create an interpreter that uses this representation to interpret sentences in the language.

The process involves the parser reading the source code, recognizing the code structure according to grammar rules, generating an Abstract Syntax Tree (AST), and finally, the AST being compiled or optimized.

Therefore, the Interpreter Pattern involves four roles: `Abstract Expression`, `Terminal Expression`, `Non-terminal Expression`, and `Context`.

Now, let's consider the development of a robot control program through a graphical interface, where control commands are set to manipulate the robot's movement (direction, action, distance).

1. Define grammar rules:

```
expression ::= direction action distance | composite  // Expression

composite ::= expression 'and' expression             // Composite expression

direction ::= 'up' | 'down' | 'left' | 'right'        // Movement direction

action ::= 'move' | 'run'                             // Movement action

distance ::= an integer                               // Movement distance
```

Terminals: direction, action, distance
Non-terminals: expression, composite

2. Create an abstract node class serving as the Abstract Expression:

```ts
export abstract class AbstractNode {
  abstract interpret(): string;
}
```

3.1. Create an And node class serving as the Non-terminal Expression:

```ts
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
    return this.#left.interpret() + " and then " + this.#right.interpret();
  }
}
```

3.2. Create a simple sentence node class serving as the Non-terminal Expression:

```ts
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
```

4.1. Create a direction node class serving as the Terminal Expression:

```ts
import { AbstractNode } from "./AbstractNode";

export class DirectionNode extends AbstractNode {
  #direction: string;
  constructor(direction: string) {
    super();
    this.#direction = direction;
  }

  interpret(): string {
    const _direction = this.#direction.toLowerCase();
    if (_direction === "up") {
      return "move upward";
    } else if (_direction === "down") {
      return "move downward";
    } else if (_direction === "left") {
      return "move to the left";
    } else if (_direction === "right") {
      return "move to the right";
    } else {
      return "invalid command";
    }
  }
}
```

4.2. Create an action node class serving as the Terminal Expression:

```ts
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
      return "move";
    } else if (_action === "run") {
      return "run quickly";
    } else {
      return "invalid command";
    }
  }
}
```

4.3. Create a distance node class serving as the Terminal Expression:

```ts
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
```

5. Create an instruction handler class:

```ts
import { AbstractNode } from "./AbstractNode";
import { ActionNode } from "./ActionNode";
import { AndNode } from "./AndNode";
import { DirectionNode } from "./DirectionNode";
import { DistanceNode } from "./DistanceNode";
import { SentenceNode } from "./SentenceNode";

export class InstructionHandler {
  #node: AbstractNode | undefined;

  handle(instruction: string): void {
    let left: AbstractNode, right: AbstractNode;

    let direction: AbstractNode, action: AbstractNode, distance: AbstractNode;

    // Declare a stack object to store the abstract syntax tree
    const stack: AbstractNode[] = [];
    // Split the instruction string by spaces
    let words: string[] = instruction.split(" ");
    for (let i = 0; i < words.length; i++) {
      /**
       * If encountering 'and', consider the next 3 words as terminal expressions
       * and connect them to form a simple sentence (SentenceNode) as the right expression of 'and'.
       * Pop the expression from the top of the stack as the left expression of 'and',
       * and push the new 'and' expression onto the stack.
       */
      if (words[i].toLowerCase() === "and") {
        left = stack.pop()!;
        const word1: string = words[++i];
        direction = new DirectionNode(word1);
        const word2: string = words[++i];
        action = new ActionNode(word2);
        const word3: string = words[++i];
        distance = new DistanceNode(word3);
        right = new SentenceNode(direction, action, distance);
        stack.push(new AndNode(left, right));
      } else {
        /**
         * If interpreting from the beginning, create a simple sentence
         * (SentenceNode) from the first 3 words and push it onto the stack.
         */
        const word1: string = words[i];
        direction = new DirectionNode(word1);
        const word2: string = words[++i];
        action = new ActionNode(word2);
        const word3: string = words[++i];
        distance = new DistanceNode(word3);
        left = new SentenceNode(direction, action, distance);
        stack.push(left);
      }
    }
    this.#node = stack.pop();
  }

  output(): string | undefined {
    return this.#node?.interpret();
  }
}
```

6. Write a client testing method:

```ts
import { InstructionHandler } from "./InstructionHandler";

export const InterpreterPatternClient = () => {
  const instruction: string = "down run 10 and left move 20";
  const handler: InstructionHandler = new InstructionHandler();
  handler.handle(instruction);

  const outString: string | undefined = handler.output();
  console.log(outString);
};
```
