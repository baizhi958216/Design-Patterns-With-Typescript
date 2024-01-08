import { IgoChessman } from "./IgoChessman";
import { IgoChessmanFactory } from "./IgoChessmanFactory";

export const FlyweightPatternClient = () => {
  let black1: IgoChessman,
    black2: IgoChessman,
    black3: IgoChessman,
    white1: IgoChessman,
    white2: IgoChessman;
  let factory: IgoChessmanFactory;

  factory = IgoChessmanFactory.getInstance();

  black1 = factory.getIgoChessman("b");
  black2 = factory.getIgoChessman("b");
  black3 = factory.getIgoChessman("b");
  console.log(`判断两颗黑子是否相同：${black1 === black2}`);

  white1 = factory.getIgoChessman("w");
  white2 = factory.getIgoChessman("w");
  console.log(`判断两颗白子是否相同：${white1 === white2}`);

  black1.display();
  black2.display();
  black3.display();
  white1.display();
  white2.display();
};
