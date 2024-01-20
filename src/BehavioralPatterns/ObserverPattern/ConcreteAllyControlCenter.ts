import { AllyControlCenter } from "./AllyControlCenter";

export class ConcreteAllyControlCenter extends AllyControlCenter {
  constructor(allyName: string) {
    super();
    console.log(`${allyName}战队组建成功`);
    console.log("------------------------------------");
    this.allyName = allyName;
  }

  // 实现通知方法
  notifyObserver(name: string): void {
    console.log(`${this.allyName}战队紧急通知，盟友${name}遭受敌人攻击！`);
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].getName() !== name) {
        this.players[i].help();
      }
    }
  }
}
