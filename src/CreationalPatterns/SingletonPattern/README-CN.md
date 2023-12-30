# 单例模式

确保一个类只有一个实例，并提供一个全局访问点来访问这个唯一实例。

单例模式是结构最简单的设计模式，只有一个单例类，在内部创建它的唯一实例，通过静态方法让客户端使用这个唯一实例。为了防止在外部被实例化，需要将构造函数设置为私有属性，定义一个静态对象作为供外部共享访问的唯一实例。

因此，单例模式有一个角色：`单例类`

假设需要开发一款服务器负载均衡软件，可以将并发的流量分配到服务器集群，系统中只能有一个负载均衡器负责服务器的管理和请求分发。

1. 创建负载均衡器类，充当单例角色：

```ts
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
```

2. 创建客户端测试函数：

```ts
import { LoadBalancer } from "./LoadBalancer";

export const SingletonPatternClient = () => {
  let balancer1: LoadBalancer,
    balancer2: LoadBalancer,
    balancer3: LoadBalancer,
    balancer4: LoadBalancer;

  balancer1 = LoadBalancer.getLoadBalancer();
  balancer2 = LoadBalancer.getLoadBalancer();
  balancer3 = LoadBalancer.getLoadBalancer();
  balancer4 = LoadBalancer.getLoadBalancer();

  if (
    balancer1 === balancer2 &&
    balancer2 === balancer3 &&
    balancer3 === balancer4
  ) {
    console.log("服务器负载均衡器具有唯一性！");
  }

  balancer1.addServer("server1");
  balancer1.addServer("server2");
  balancer1.addServer("server3");
  balancer1.addServer("server4");

  // 模拟客户端请求的分发，如果输出结果为同一个server，可以将i适当放大
  // 例如改为i<100
  for (let i = 0; i < 10; i++) {
    const server: string = balancer1.getServer();
    console.log(`分发请求至服务器${server}`);
  }
};
```

以上实现了懒汉式单例，在第一次调用`getLoadBalancer()`时实例化，在类加载时并不自行实例化，这种技术称为延迟加载技术，即在需要的时候再加载实例。

受 JavaScript 单线程的影响，NodeJS 中使用非阻塞 I/O 操作和事件驱动的模型处理并发请求，没有多线程并发问题，因此并不需要像 JAVA 那样使用`synchronized`来避免多个线程同时调用`getLoadBalancer()`方法，遥遥领先。
