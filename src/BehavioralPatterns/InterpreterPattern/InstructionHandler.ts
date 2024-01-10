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
