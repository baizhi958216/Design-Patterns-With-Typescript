import { Chessman } from "./Chessman";
import { MementoCaretaker } from "./MementoCaretaker";

export const MementoPatternClient = () => {
  const mc: MementoCaretaker = new MementoCaretaker();
  const chess: Chessman = new Chessman("車", 1, 1);
  display(chess);
  mc.setMemento(chess.save()); //保存状态
  chess.setY(4);
  display(chess);
  mc.setMemento(chess.save()); //保存状态
  chess.setX(5);
  display(chess);
  console.log("****** 悔棋 ******");
  chess.restore(mc.getMemento());
  display(chess);
};

const display = (chess: Chessman) => {
  console.log(
    `棋子"${chess.getLabel()}"当前位置为：第${chess.getX()}行第${chess.getY()}列。`
  );
};
