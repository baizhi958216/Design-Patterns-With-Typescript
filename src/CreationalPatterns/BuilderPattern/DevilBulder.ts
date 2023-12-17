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
