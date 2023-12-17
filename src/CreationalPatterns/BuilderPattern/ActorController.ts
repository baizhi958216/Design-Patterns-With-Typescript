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
