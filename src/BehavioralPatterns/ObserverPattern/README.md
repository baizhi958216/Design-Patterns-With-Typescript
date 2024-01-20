# Observer Pattern

The Observer Pattern, also known as the Publish-Subscribe pattern, Model-View pattern, Source-Listener pattern, or Dependents pattern, defines a one-to-many dependency relationship between objects. It allows multiple objects to be notified and automatically updated whenever the state of one object changes.

When an object's state or behavior changes, it causes changes in the state or behavior of other objects, creating a cascading effect between them. The Observer Pattern defines a one-to-many dependency relationship between objects, enabling changes in one object to affect others.

The Observer Pattern involves four roles: `Subject`, `Concrete Subject`, `Observer`, and `Concrete Observer`.

Let's consider an example of a multiplayer game where teammates need to be notified and respond when attacked by enemies.

1. Create an abstract class called `AllyControlCenter`, which acts as the abstract subject:

```ts
import { Observer } from "./Observer";

export abstract class AllyControlCenter {
  protected allyName: string | undefined;
  // Define a collection to store team members
  protected players: Array<Observer> = [];

  setAllyName(allyName: string): void {
    this.allyName = allyName;
  }

  getAllyName(): string | undefined {
    return this.allyName;
  }

  // Registration method
  join(obs: Observer) {
    console.log(`${obs.getName()} joins the ${this.allyName} team!`);
    this.players.push(obs);
  }

  // Unsubscribe method
  quit(obs: Observer) {
    console.log(`${obs.getName()} quits the ${this.allyName} team!`);
    this.players.splice(this.players.indexOf(obs), 1);
  }

  // Declare the abstract notification method
  abstract notifyObserver(name: string): void;
}
```

2. Create a concrete class called `ConcreteAllyControlCenter`, which acts as the concrete subject:

```ts
import { AllyControlCenter } from "./AllyControlCenter";

export class ConcreteAllyControlCenter extends AllyControlCenter {
  constructor(allyName: string) {
    super();
    console.log(`The ${allyName} team is formed.`);
    console.log("------------------------------------");
    this.allyName = allyName;
  }

  // Implement the notification method
  notifyObserver(name: string): void {
    console.log(
      `Emergency notification from the ${this.allyName} team: Ally ${name} is under attack by enemies!`
    );
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].getName() !== name) {
        this.players[i].help();
      }
    }
  }
}
```

3. Create an interface called `Observer`, which acts as the abstract observer:

```ts
import { ConcreteAllyControlCenter } from "./ConcreteAllyControlCenter";

export interface Observer {
  getName(): string;
  setName(name: string): void;
  help(): void;
  beAttacked(acc: ConcreteAllyControlCenter): void;
}
```

4. Create a class called `Player`, which acts as the concrete observer:

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

  // Implement the method to support allies
  help(): void {
    console.log(`Hold on, ${this.#name} is coming to save you!`);
  }

  // Implement the method to be attacked, which calls the notifyObserver() method of the AllyControlCenter class to notify allies
  beAttacked(acc: ConcreteAllyControlCenter): void {
    console.log(`${this.#name} is under attack!`);
    acc.notifyObserver(this.#name);
  }
}
```

5. Create a client test function:

```ts
import { AllyControlCenter } from "./AllyControlCenter";
import { ConcreteAllyControlCenter } from "./ConcreteAllyControlCenter";
import { Observer } from "./Observer";
import { Player } from "./Player";

export const ObserverPatternClient = () => {
  const acc: AllyControlCenter = new ConcreteAllyControlCenter(
    "Jinyong Heroes"
  );

  let player1: Observer,
    player2: Observer,
    player3: Observer,
    player4: Observer;

  player1 = new Player("Yang Guo");
  acc.join(player1);
  player2 = new Player("Linghu Chong");
  acc.join(player2);
  player3 = new Player("Zhang Wuji");
  acc.join(player3);
  player4 = new Player("Duan Yu");
  acc.join(player4);

  player1.beAttacked(acc);
};
```
