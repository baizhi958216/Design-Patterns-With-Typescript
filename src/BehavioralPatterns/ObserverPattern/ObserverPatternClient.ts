import { AllyControlCenter } from "./AllyControlCenter";
import { ConcreteAllyControlCenter } from "./ConcreteAllyControlCenter";
import { Observer } from "./Observer";
import { Player } from "./Player";

export const ObserverPatternClient = () => {
  const acc: AllyControlCenter = new ConcreteAllyControlCenter("金庸群侠");

  let player1: Observer,
    player2: Observer,
    player3: Observer,
    player4: Observer;

  player1 = new Player("杨过");
  acc.join(player1);
  player2 = new Player("令狐冲");
  acc.join(player2);
  player3 = new Player("张无忌");
  acc.join(player3);
  player4 = new Player("段誉");
  acc.join(player4);

  player1.beAttacked(acc);
};
