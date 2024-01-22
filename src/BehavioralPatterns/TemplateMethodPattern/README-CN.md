# 模板方法模式

定义一个操作中算法的框架，而将一些步骤延迟到子类中。模板方法模式使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。

模板方法模式是结构最简单的行为型设计模式，在其结构中只存在父类与子类之间的继承关系。

将一些复杂流程的实现封装在一系列的基本方法中，在抽象父类中提供一个称为模板方法的方法来定义这些基本方法的执行次序，而通过其子类来覆盖某些步骤，从而使得相同的算法框架可以有不同的执行结果。

因此，模板方法模式有 2 个角色：`抽象类`，`具体子类`。

例如要开发一个利息计算模块，系统先根据账号密码验证用户信息，根据用户类型不同使用不同的公式计算，最后显示利息。

1. 新建一个账户类，充当抽象类：

```ts
export abstract class Account {
  // 基本方法——具体方法
  validate(account: string, password: string): boolean {
    console.log(`账号：${account}`);
    console.log(`密码：${password}`);
    return account === "张无忌" && password === "123456";
  }

  // 基本方法——抽象方法
  abstract calculateInterest(): void;

  // 基本方法——具体方法
  display(): void {
    console.log("显示利息！");
  }

  // 模板方法
  handle(account: string, password: string): void {
    if (!this.validate(account, password)) {
      console.log("账号或密码错误");
      return;
    }
    this.calculateInterest();
    this.display();
  }
}
```

2. 新建活期账户类，充当具体子类：

```ts
import { Account } from "./Account";

export class CurrentAccount extends Account {
  calculateInterest(): void {
    console.log("按活期利率计算利息！");
  }
}
```

3. 新建定期账户类，充当具体子类：

```ts
import { Account } from "./Account";

export class SavingAccount extends Account {
  calculateInterest(): void {
    console.log("按活期利率计算利息！");
  }
}
```

4. 新建客户端测试函数：

```ts
import { Account } from "./Account";
import { CurrentAccount } from "./CurrentAccount";

export const TemplateMethodPatternClient = () => {
  const account: Account = new CurrentAccount();
  account.handle("张无忌", "123456");
};
```
