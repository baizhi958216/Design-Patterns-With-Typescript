# 观察者模式

观察者模式的别名有发布-订阅（Publish-Subscribe）模式、模型-视图（Model-View）模式、源-监听器（Source-Listener）模式、从者（Dependents）模式。

定义对象之间的一种一对多的依赖关系，使得每当一个对象状态发生改变时其相关依赖对象皆得到通知并被自动更新。

一个对象的状态或行为的变化将导致其他对象的状态或行为也发生改变，它们之间将产生联动。

观察者模式定义了对象之间的一种一对多的依赖关系，让一个对象的改变能够影响其他对象。

因此，观察者模式有 4 个角色：`目标`，`具体目标`，`观察者`，`具体观察者`。

现有一款多人游戏，当受到敌人攻击时向队友发送通知，然后做出响应。

1. 新建指挥部（战队控制中心）类，充当抽象目标类：

```ts
import { Observer } from "./Observer";

export abstract class AllyControlCenter {
  protected allyName: string | undefined;
  // 定义一个集合用于存储战队成员
  protected players: Array<Observer> = [];

  setAllyName(allyName: string): void {
    this.allyName = allyName;
  }

  getAllyName(): string | undefined {
    return this.allyName;
  }

  // 注册方法
  join(obs: Observer) {
    console.log(`${obs.getName()}加入${this.allyName}战队！`);
    this.players.push(obs);
  }

  // 注销方法
  quit(obs: Observer) {
    console.log(`${obs.getName()}退出${this.allyName}战队！`);
    this.players.splice(this.players.indexOf(obs), 1);
  }

  // 声明抽象通知方法
  abstract notifyObserver(name: string): void;
}
```

2. 新建具体指挥部类，充当具体目标类：

```ts
import { AllyControlCenter } from "./AllyControlCenter";

export class ConcreteAllyControlCenter extends AllyControlCenter {
  constructor(allyName: string) {
    super();
    console.log(`${allyName}战队组建成功`);
    console.log("------------------------------------");
    this.allyName = allyName;
  }

  // 实现通知方法
  notifyObserver(name: string): void {
    console.log(`${this.allyName}战队紧急通知，盟友${name}遭受敌人攻击！`);
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].getName() !== name) {
        this.players[i].help();
      }
    }
  }
}
```

3. 新建抽象观察者类：

```ts
import { ConcreteAllyControlCenter } from "./ConcreteAllyControlCenter";

export interface Observer {
  getName(): string;
  setName(name: string): void;
  help(): void;
  beAttacked(acc: ConcreteAllyControlCenter): void;
}
```

4. 新建战队成员类，充当具体观察者类：

```ts
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
```

5. 新建客户端测试函数：

```ts
import { AllyControlCenter } from "./AllyControlCenter";
import { ConcreteAllyControlCenter } from "./ConcreteAllyControlCenter";
import { Observer } from "./Observer";
import { Player } from "./Player";

export const ObserverPatternClient = () => {
  const acc: AllyControlCenter = new ConcreteAllyControlCenter("金庸群侠");

  let player1: Observer,
    player2: Observer,
    player3: Observer,
    player4: Observer;

  player1 = new Player("杨过");
  acc.join(player1);
  player2 = new Player("令狐冲");
  acc.join(player2);
  player3 = new Player("张无忌");
  acc.join(player3);
  player4 = new Player("段誉");
  acc.join(player4);

  player1.beAttacked(acc);
};
```
