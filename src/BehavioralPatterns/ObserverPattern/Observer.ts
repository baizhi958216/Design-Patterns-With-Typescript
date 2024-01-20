import { ConcreteAllyControlCenter } from "./ConcreteAllyControlCenter";

export interface Observer {
  getName(): string;
  setName(name: string): void;
  help(): void;
  beAttacked(acc: ConcreteAllyControlCenter): void;
}
