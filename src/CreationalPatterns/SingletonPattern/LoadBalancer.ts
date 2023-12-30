export class LoadBalancer {
  static #instance: LoadBalancer;
  #serverList: string[] = [];

  #LoadBalancer() {
    this.#serverList = [];
  }

  static getLoadBalancer(): LoadBalancer {
    // 懒汉式单例
    if (this.#instance == null) {
      this.#instance = new LoadBalancer();
    }
    return this.#instance;
  }

  // 增加服务器
  addServer(serverName: string) {
    this.#serverList.push(serverName);
  }

  // 删除服务器
  removeServer(serverName: string) {
    const index = this.#serverList.indexOf(serverName);
    if (index > -1) {
      this.#serverList.splice(index, 1);
    }
  }

  // 随机获取服务器
  getServer(): string {
    return this.#serverList[
      Math.floor(Math.random() * this.#serverList.length)
    ];
  }
}
