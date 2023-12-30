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
