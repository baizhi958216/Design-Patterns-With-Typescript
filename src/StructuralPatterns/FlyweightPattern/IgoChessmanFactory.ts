import { BlackIgoChessman } from "./BlackIgoChessman";
import { IgoChessman } from "./IgoChessman";
import { WhiteIgoChessman } from "./WhiteIgoChessman";

export class IgoChessmanFactory {
  static instance: IgoChessmanFactory = new IgoChessmanFactory();
  //  享元池
  ht: Map<string, IgoChessman>;

  constructor() {
    this.ht = new Map();
    let black: IgoChessman, white: IgoChessman;
    black = new BlackIgoChessman();
    white = new WhiteIgoChessman();
    this.ht.set("b", black);
    this.ht.set("w", white);
  }

  static getInstance(): IgoChessmanFactory {
    return this.instance;
  }

  getIgoChessman(color: string): IgoChessman {
    return this.ht.get(color)!;
  }
}
