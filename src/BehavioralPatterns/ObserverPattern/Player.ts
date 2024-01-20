import { ConcreteAllyControlCenter } from "./ConcreteAllyControlCenter";
import { Observer } from "./Observer";

export class Player implements Observer {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  setName(name: string): void {
    this.#name = name;
  }

  getName(): string {
    return this.#name;
  }

  // 支援盟友方法实现
  help(): void {
    console.log(`坚持住，${this.#name}来救你！`);
  }

  // 遭受攻击方法的实现，当遭受攻击时将调用战队控制中心类的通知方法notifyObserver()来通知盟友
  beAttacked(acc: ConcreteAllyControlCenter): void {
    console.log(`${this.#name}被攻击！`);
    acc.notifyObserver(this.#name);
  }
}
