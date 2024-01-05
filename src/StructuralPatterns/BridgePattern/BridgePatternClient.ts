import { Image } from "./Image";
import { ImageImp } from "./ImageImp";
import config from "./config.json";

export const BridgePatternClient = async () => {
  const RefinedAbstraction: string = config.RefinedAbstraction;
  const ConcreteImplementor: string = config.ConcreteImplementor;

  const RefinedAbstractionModule = await import(`./${RefinedAbstraction}`);
  const ConcreteImplementorModule = await import(`./${ConcreteImplementor}`);

  const RefinedAbstractionClass = RefinedAbstractionModule[RefinedAbstraction];
  const ConcreteImplementorClass =
    ConcreteImplementorModule[ConcreteImplementor];

  const image: Image = new RefinedAbstractionClass();
  const imp: ImageImp = new ConcreteImplementorClass();
  image.setImageImp(imp);
  image.parseFile("小龙女");
};
