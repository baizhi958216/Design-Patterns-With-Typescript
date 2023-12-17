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
