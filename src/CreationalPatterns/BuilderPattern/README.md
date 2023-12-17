# Builder Pattern

The Builder Pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

It decouples the process of creating a complex object from the client, where the product only needs to know what components it requires without concerning itself with how these components are assembled or what structure they have. The Builder Pattern focuses on defining step-by-step construction of these components, and different builders define different creation processes.

The Builder Pattern involves four roles: `Abstract Builder`, `Concrete Builder`, `Product`, and `Director`.

Suppose we are designing characters for a game, where each character possesses different abilities based on the game plot and statistical data (such as strength, magic, skills, etc.). Characters also gain more powerful abilities as they level up. With updates to the game, new characters will be introduced.

1. Define the game character class as a complex product object:

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

2. Define the game character builder as an abstract builder:

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

3. Define the hero character builder as a concrete builder:

```ts
import { ActorBuilder } from "./ActorBuilder";

export class HeroBuilder extends ActorBuilder {
  buildType(): void {
    this.actor.setType("Hero");
  }
  buildSex(): void {
    this.actor.setSex("Male");
  }
  buildFace(): void {
    this.actor.setFace("Handsome");
  }
  buildCostume(): void {
    this.actor.setCostume("Armor");
  }
  buildHairStyle(): void {
    this.actor.setHairstyle("Flowing");
  }
}
```

4. Define the angel character builder as a concrete builder:

```ts
import { ActorBuilder } from "./ActorBuilder";

export class AngelBuilder extends ActorBuilder {
  buildType(): void {
    this.actor.setType("Angel");
  }
  buildSex(): void {
    this.actor.setSex("Female");
  }
  buildFace(): void {
    this.actor.setFace("Beautiful");
  }
  buildCostume(): void {
    this.actor.setCostume("White Dress");
  }
  buildHairStyle(): void {
    this.actor.setHairstyle("Shoulder-length Hair");
  }
}
```

5. Define the devil character builder as a concrete builder:

```ts
import { ActorBuilder } from "./ActorBuilder";

export class DevilBuilder extends ActorBuilder {
  buildType(): void {
    this.actor.setType("Devil");
  }
  buildSex(): void {
    this.actor.setSex("Demon");
  }
  buildFace(): void {
    this.actor.setFace("Ugly");
  }
  buildCostume(): void {
    this.actor.setCostume("Black Clothing");
  }
  buildHairStyle(): void {
    this.actor.setHairstyle("Bald");
  }
}
```

6. Define the character controller as a director:

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

7. Configuration file adhering to the Open-Closed Principle:

```json
{
  "builderClassName": "HeroBuilder"
}
```

8. Write a client test method:

```ts
import { Actor } from "./Actor";
import { ActorBuilder } from "./ActorBuilder";
import { ActorController } from "./ActorController";
import config from "./config.json";

export const BuilderPatternClient = async () => {
  // Get the builder class name from the configuration
  const builderClassName: string = config.builderClassName;
  // Dynamically import the module containing the builder class
  const module = await import(`./${builderClassName}`);
  // Get the specific builder class
  const builderClass = module[builderClassName];

  let ab: ActorBuilder;
  ab = new builderClass();

  let ac: ActorController = new ActorController();
  let actor: Actor;
  actor = ac.construct(ab);

  const actorType: string = actor.getType();
  console.log(`
  
  Appearance of ${actorType}:

  Gender: ${actor.getSex()}
  Face: ${actor.getFace()}
  Costume: ${actor.getCostume()}
  Hairstyle: ${actor.getHairstyle()}
  
  `);
};
```
