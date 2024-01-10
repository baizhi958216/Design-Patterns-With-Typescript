# 解释器模式

解释器模式用于描述如何构成一个简单的语言解释器，主要应用于使用面向对象语言开发的解释器设计，当需要开发一个新的语言时可以考虑使用解释器模式。

给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。

首先由解析器读取源代码，按照文法规则识别代码结构，然后生成 AST，最后 AST 会被编译或者优化。

因此，解释器模式有 4 个角色：`抽象表达式`，`终结符表达式`，`非终结符表达式`，`环境类`

现要开发一套机器人控制程序，通过图形化界面设置控制指令，控制指令控制机器人移动（方向、方式、距离）。

1. 定义语法规则：

```
expression ::= direction action distance | composite  //表达式

composite ::= expression 'and' expression             //复合表达式

direction ::= 'up' | 'down' | 'left' | 'right'        //移动方向

action ::= 'move' | 'run'                             //移动方式

distance ::= an integer                               //移动距离
```

终结符： direction、action、distance

非终结符： expression、composite

2. 新建抽象节点类，充当抽象表达式角色：

```ts
export abstract class AbstractNode {
  abstract interpret(): string;
}
```

3.1. 新建 And 节点类，充当非终结符表达式角色：

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
    return this.#left.interpret() + "再" + this.#right.interpret();
  }
}
```

3.2. 新建简单句子节点类，充当非终结符表达式角色：

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

4.1. 新建方向节点类，充当终结符表达式角色：

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
      return "向上";
    } else if (_direction === "down") {
      return "向下";
    } else if (_direction === "left") {
      return "向左";
    } else if (_direction === "right") {
      return "向右";
    } else {
      return "无效指令";
    }
  }
}
```

4.2. 新建动作节点类，充当终结符表达式角色：

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
      return "移动";
    } else if (_action === "run") {
      return "快速移动";
    } else {
      return "无效指令";
    }
  }
}
```

4.3. 新建距离节点类，充当终结符表达式角色：

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

5. 新建指令处理类：

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

    // 声明一个栈对象用于存储抽象语法树
    const stack: AbstractNode[] = [];
    // 以空格分隔指令字符串
    let words: string[] = instruction.split(" ");
    for (let i = 0; i < words.length; i++) {
      /**
       * 如果遇到'and'，将其后的3个单词作为3个终结符表达式
       * 连成一个简单句子SentenceNode作为'and'的右表达式，
       * 而将从栈顶弹出的表达式作为'and'的左表达式，
       * 最后将新的'and'表达式压入栈中。
       */
      if (words[i].toLowerCase() === "and") {
        left = stack.pop()!; // 弹出栈顶表达式作为左表达式
        const word1: string = words[++i];
        direction = new DirectionNode(word1);
        const word2: string = words[++i];
        action = new ActionNode(word2);
        const word3: string = words[++i];
        distance = new DistanceNode(word3);
        right = new SentenceNode(direction, action, distance); //  右表达式
        stack.push(new AndNode(left, right)); // 将新表达式压入栈中
      } else {
        /**
         * 如果是从头开始进行解释，则将前3个单词组成一个简单句子
         * SentenceNode并将该句子压入栈中。
         */
        const word1: string = words[i];
        direction = new DirectionNode(word1);
        const word2: string = words[++i];
        action = new ActionNode(word2);
        const word3: string = words[++i];
        distance = new DistanceNode(word3);
        left = new SentenceNode(direction, action, distance);
        stack.push(left); // 将新表达式压入栈中
      }
    }
    this.#node = stack.pop(); // 将全部表达式从栈中弹出
  }

  output(): string | undefined {
    return this.#node?.interpret(); // 解释表达式
  }
}
```

6. 编写客户端测试方法：

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
