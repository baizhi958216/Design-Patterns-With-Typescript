# 代理模式

当无法直接访问某个对象或访问某个对象存在困难时可以通过一个代理对象来间接访问，根据不同的需求又把代理模式分为保护代理、远程代理、虚拟代理等。

给某一个对象提供一个代理或占位符，并由代理对象来控制对原对象的访问。

代理对象在客户端对象和目标对象之间起到中介的作用，去掉客户端不能看到的内容和服务，或者增加客户需要的额外服务。

因此，代理模式有 3 个角色：`抽象主题角色`，`代理主题角色`，`真实主题角色`。

现在需要对一款收费商务信息查询系统新增两项功能，新增查询前身份验证，新增查询次数，按照次数收费。

1.1. 新建身份验证类(业务类)：

```ts
export class AccessValidator {
  validate(userId: string): boolean {
    console.log(`在数据库中验证用户${userId}是否为合法用户？`);
    if (userId === "user") {
      console.log("登录成功");
      return true;
    }
    console.log("登录失败");
    return false;
  }
}
```

1.2. 新建日志记录类(业务类)：

```ts
export class Logger {
  log(userId: string): void {
    console.log(`更新数据库，用户${userId}查询次数加1！`);
  }
}
```

2. 新建抽象查询类，充当抽象主题角色：

```ts
export interface Searcher {
  doSearch(userId: string, keyword: string): string;
}
```

3. 新建具体查询类，充当真实主题角色：

```ts
import { Searcher } from "./Searcher";

export class RealSearch implements Searcher {
  doSearch(userId: string, keyword: string): string {
    console.log(`用户${userId}使用关键词${keyword}查询商务信息！`);
    return "返回具体内容";
  }
}
```

4. 新建代理查询类，充当代理主题角色：

```ts
import { AccessValidator } from "./AccessValidator";
import { Logger } from "./Logger";
import { RealSearcher } from "./RealSearcher";
import { Searcher } from "./Searcher";

export class ProxySearcher implements Searcher {
  #searcher: RealSearcher = new RealSearcher();
  #validator: AccessValidator | undefined;
  #logger: Logger | undefined;

  validate(userId: string): boolean {
    this.#validator = new AccessValidator();
    return this.#validator.validate(userId);
  }

  log(userId: string): void {
    this.#logger = new Logger();
    this.#logger.log(userId);
  }

  doSearch(userId: string, keyword: string): string | null {
    if (this.validate(userId)) {
      const result: string = this.#searcher.doSearch(userId, keyword);
      this.log(userId);
      return result;
    } else {
      return null;
    }
  }
}
```

5. 新建测试方法：

```ts
import { ProxySearcher } from "./ProxySearcher";
import { Searcher } from "./Searcher";

export const ProxyPatternClient = () => {
  const searcher: Searcher = new ProxySearcher();
  const result: string | null = searcher.doSearch("用户", "玉女心经");
  return result;
};
```
