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
