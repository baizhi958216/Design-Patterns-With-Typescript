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
