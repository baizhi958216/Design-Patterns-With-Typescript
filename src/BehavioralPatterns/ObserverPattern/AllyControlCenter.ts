import { Observer } from "./Observer";

export abstract class AllyControlCenter {
  protected allyName: string | undefined;
  // 定义一个集合用于存储战队成员
  protected players: Array<Observer> = [];

  setAllyName(allyName: string): void {
    this.allyName = allyName;
  }

  getAllyName(): string | undefined {
    return this.allyName;
  }

  // 注册方法
  join(obs: Observer) {
    console.log(`${obs.getName()}加入${this.allyName}战队！`);
    this.players.push(obs);
  }

  // 注销方法
  quit(obs: Observer) {
    console.log(`${obs.getName()}退出${this.allyName}战队！`);
    this.players.splice(this.players.indexOf(obs), 1);
  }

  // 声明抽象通知方法
  abstract notifyObserver(name: string): void;
}
