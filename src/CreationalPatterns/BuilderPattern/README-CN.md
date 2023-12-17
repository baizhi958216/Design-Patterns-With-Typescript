# 建造者模式

将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

将客户端创建复杂对象的过程分离，产品只需要知道所需要的部件是什么即可，而不关注这个部件是怎么组成的或者是什么结构的。建造者模式关注如何一步一步创建这个部件，不同的建造者定义了不同的创建过程。

建造者模式有 4 个角色：`抽象建造者`，`具体建造者`，`产品`，`指挥者`

假设设计一个角色，角色根据游戏情节和统计数据（例如力量、魔法、技能等）具有不同的能力，角色也会随着不断升级而拥有更加强大的能力。随着该游戏的更新，也会出现越来越多的新角色。

1. 定义游戏角色类，充当复杂产品对象：

```ts
export class Actor {
  #type: string = "";
  #sex: string = "";
  #face: string = "";
  #costume: string = "";
  #hairstyle: string = "";

  public setType(type: string): void {
    this.#type = type;
  }
  public setSex(sex: string): void {
    this.#sex = sex;
  }
  public setFace(face: string): void {
    this.#face = face;
  }
  public setCostume(costume: string): void {
    this.#costume = costume;
  }
  public setHairstyle(hairstyle: string): void {
    this.#hairstyle = hairstyle;
  }
  public getType(): string {
    return this.#type;
  }
  public getSex(): string {
    return this.#sex;
  }

  public getFace(): string {
    return this.#face;
  }

  public getCostume(): string {
    return this.#costume;
  }

  public getHairstyle(): string {
    return this.#hairstyle;
  }
}
```

2. 定义游戏角色建造者，充当抽象建造者：

```ts
import { Actor } from "./Actor";

export abstract class ActorBuilder {
  protected actor: Actor = new Actor();
  abstract buildType(): void;
  abstract buildSex(): void;
  abstract buildFace(): void;
  abstract buildCostume(): void;
  abstract buildHairStyle(): void;

  createActor(): Actor {
    return this.actor;
  }
}
```

3. 定义英雄角色建造者，充当具体建造者：

```ts
import { ActorBuilder } from "./ActorBuilder";

export class HeroBuilder extends ActorBuilder {
  buildType(): void {
    this.actor.setType("英雄");
  }
  buildSex(): void {
    this.actor.setSex("男");
  }
  buildFace(): void {
    this.actor.setFace("英俊");
  }
  buildCostume(): void {
    this.actor.setCostume("盔甲");
  }
  buildHairStyle(): void {
    this.actor.setHairstyle("飘逸");
  }
}
```

4. 定义天使角色建造者，充当具体建造者：

```ts
import { ActorBuilder } from "./ActorBuilder";

export class AngelBuilder extends ActorBuilder {
  buildType(): void {
    this.actor.setType("天使");
  }
  buildSex(): void {
    this.actor.setSex("女");
  }
  buildFace(): void {
    this.actor.setFace("漂亮");
  }
  buildCostume(): void {
    this.actor.setCostume("白裙");
  }
  buildHairStyle(): void {
    this.actor.setHairstyle("披肩长发");
  }
}
```

5. 定义恶魔角色建造者，充当具体建造者：

```ts
import { ActorBuilder } from "./ActorBuilder";

export class DevilBuild extends ActorBuilder {
  buildType(): void {
    this.actor.setType("恶魔");
  }
  buildSex(): void {
    this.actor.setSex("妖");
  }
  buildFace(): void {
    this.actor.setFace("丑陋");
  }
  buildCostume(): void {
    this.actor.setCostume("黑衣");
  }
  buildHairStyle(): void {
    this.actor.setHairstyle("光头");
  }
}
```

6. 定义角色控制器，充当指挥者

```ts
import { Actor } from "./Actor";
import { ActorBuilder } from "./ActorBuilder";

export class ActorController {
  construct(ab: ActorBuilder): Actor {
    let actor: Actor;
    ab.buildType();
    ab.buildSex();
    ab.buildFace();
    ab.buildCostume();
    ab.buildHairStyle();
    actor = ab.createActor();
    return actor;
  }
}
```

7. 符合开闭原则的配置文件：

```json
{
  "builderClassName": "HeroBuilder"
}
```

8. 编写客户端测试方法：

```ts
import { Actor } from "./Actor";
import { ActorBuilder } from "./ActorBuilder";
import { ActorController } from "./ActorController";
import config from "./config.json";

export const BuilderPatternClient = async () => {
  // 获取配置中的工厂类名
  const builderClassName: string = config.builderClassName;
  // 动态导入工厂类的模块
  const module = await import(`./${builderClassName}`);
  // 获取具体工厂类
  const builderClass = module[builderClassName];
  let ab: ActorBuilder;
  ab = new builderClass();
  let ac: ActorController = new ActorController();
  let actor: Actor;
  actor = ac.construct(ab);

  const actorType: string = actor.getType();
  console.log(`
  
  ${actorType}的外观：

  性别：${actor.getSex()}
  面容：${actor.getFace()}
  服装：${actor.getCostume()}
  发型：${actor.getHairstyle()}
  
  `);
};
```
