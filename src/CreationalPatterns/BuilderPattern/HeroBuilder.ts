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
