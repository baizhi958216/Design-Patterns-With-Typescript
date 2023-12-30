# Singleton Pattern

The Singleton Pattern ensures that a class has only one instance and provides a global access point to this unique instance.

It is the simplest design pattern, involving only one singleton class that internally creates its sole instance. Clients access this unique instance through a static method. To prevent external instantiation, the constructor is set to private, and a static object serves as the unique instance accessible for external use.

Therefore, the Singleton Pattern involves a role: the `Singleton Class`.

Suppose there is a need to develop server load balancing software, capable of distributing concurrent traffic across a server cluster. The system should have only one load balancer responsible for managing servers and distributing requests.

1. Create the Load Balancer class, acting as the singleton:

```typescript
export class LoadBalancer {
  private static instance: LoadBalancer;
  private serverList: string[] = [];

  private constructor() {
    this.serverList = [];
  }

  static getLoadBalancer(): LoadBalancer {
    // Lazy initialization
    if (this.instance == null) {
      this.instance = new LoadBalancer();
    }
    return this.instance;
  }

  // Add server
  addServer(serverName: string) {
    this.serverList.push(serverName);
  }

  // Remove server
  removeServer(serverName: string) {
    const index = this.serverList.indexOf(serverName);
    if (index > -1) {
      this.serverList.splice(index, 1);
    }
  }

  // Get a server randomly
  getServer(): string {
    return this.serverList[Math.floor(Math.random() * this.serverList.length)];
  }
}
```

2. Create a client test function:

```typescript
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
    console.log("The server load balancer is unique!");
  }

  balancer1.addServer("server1");
  balancer1.addServer("server2");
  balancer1.addServer("server3");
  balancer1.addServer("server4");

  // Simulate client requests distribution; if the output is the same server,
  // you can increase the loop iteration, for example, change to i<100
  for (let i = 0; i < 10; i++) {
    const server: string = balancer1.getServer();
    console.log(`Distributing request to server ${server}`);
  }
};
```

The implementation above utilizes lazy initialization in the `getLoadBalancer()` method, instantiating the class only when it is first called. Due to JavaScript's single-threaded nature, NodeJS handles concurrent requests using non-blocking I/O operations and an event-driven model, eliminating the need for synchronization mechanisms like `synchronized` in Java.
