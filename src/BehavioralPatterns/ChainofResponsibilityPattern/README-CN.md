# 职责链模式

避免将一个请求的发送者与接收者耦合在一起，让多个对象都有机会处理请求。将接受请求对象连接成一条链，并且沿着这条链传递请求，直到有一个对象能够处理它为止。

职责链可以是一条直线、一个环或者一个树形结构，链上的每一个对象都是请求处理者。

因此，职责链有 2 个角色：`抽象处理者`，`具体处理者`。

现在要为某供应链管理系统新增采购审批子系统，主任可以审批 5 万元以下的采购单，副董事长审批 5 万元到 10 万元的采购单，董事长可以审批 10 万元到 50 万元的采购单,50 万元以上需要开董事会。

1. 新建采购单类，充当请求类：

```ts
export class PurchaseRequest {
  amount: number;
  purpose: string;
  number: number;
  constructor(amount: number, purpose: string, number: number) {
    this.amount = amount;
    this.purpose = purpose;
    this.number = number;
  }

  setAmount(amount: number): void {
    this.amount = amount;
  }

  getAmount(): number {
    return this.amount;
  }

  setPurpose(purpose: string): void {
    this.purpose = purpose;
  }

  getPurpose(): string {
    return this.purpose;
  }

  setNumber(number: number): void {
    this.number = number;
  }

  getNumber(): number {
    return this.number;
  }
}
```

2. 新建审批者类，充当抽象处理者：

```ts
import { PurchaseRequest } from "./PurchaseRequest";

export abstract class Approver {
  protected successor: Approver | undefined;
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  // 设置后继者
  setSuccessor(successor: Approver) {
    this.successor = successor;
  }

  // 抽象请求处理方法
  abstract processRequest(purchaseRequest: PurchaseRequest): void;
}
```

3. 新建主任类，充当具体处理者：

```ts
import { Approver } from "./Approver";
import { PurchaseRequest } from "./PurchaseRequest";

export class Director extends Approver {
  constructor(name: string) {
    super(name);
  }

  processRequest(request: PurchaseRequest): void {
    if (request.getAmount() < 50000) {
      console.log(
        `主任${
          this.name
        }审批采购单：${request.getNumber()}金额：${request.getAmount()}元，采购目的${request.getPurpose()}。`
      );
    } else {
      this.successor?.processRequest(request);
    }
  }
}
```

4. 新建副董事长类，充当具体处理者：

```ts
import { Approver } from "./Approver";
import { PurchaseRequest } from "./PurchaseRequest";

export class VicePresident extends Approver {
  constructor(name: string) {
    super(name);
  }

  processRequest(request: PurchaseRequest): void {
    if (request.getAmount() < 100000) {
      console.log(
        `副董事长${
          this.name
        }审批采购单：${request.getNumber()}金额：${request.getAmount()}元，采购目的${request.getPurpose()}。`
      );
    } else {
      this.successor?.processRequest(request);
    }
  }
}
```

5. 新建董事长类，充当具体处理者：

```ts
import { Approver } from "./Approver";
import { PurchaseRequest } from "./PurchaseRequest";

export class President extends Approver {
  constructor(name: string) {
    super(name);
  }

  processRequest(request: PurchaseRequest): void {
    if (request.getAmount() < 500000) {
      console.log(
        `董事长${
          this.name
        }审批采购单：${request.getNumber()}金额：${request.getAmount()}元，采购目的${request.getPurpose()}。`
      );
    } else {
      this.successor?.processRequest(request);
    }
  }
}
```

6. 新建董事会，充当具体处理者：

```ts
import { Approver } from "./Approver";
import { PurchaseRequest } from "./PurchaseRequest";

export class Congress extends Approver {
  constructor(name: string) {
    super(name);
  }

  processRequest(request: PurchaseRequest): void {
    console.log(
      `召开董事会审批采购单：${request.getNumber()}金额：${request.getAmount()}元，采购目的${request.getPurpose()}。`
    );
  }
}
```

7. 新建客户端测试方法：

```ts
import { Approver } from "./Approver";
import { Congress } from "./Congress";
import { Director } from "./Director";
import { President } from "./President";
import { PurchaseRequest } from "./PurchaseRequest";
import { VicePresident } from "./VicePresident";

export const ChainofResponsibilityPatternClient = () => {
  let wjzhang: Approver, gyang: Approver, jguo: Approver, meeting: Approver;
  wjzhang = new Director("张无忌");
  gyang = new VicePresident("杨过");
  jguo = new President("郭靖");
  meeting = new Congress("董事会");

  wjzhang.setSuccessor(gyang);
  gyang.setSuccessor(jguo);
  jguo.setSuccessor(meeting);

  const pr1 = new PurchaseRequest(45000, 10001, "购买倚天剑");
  wjzhang.processRequest(pr1);
  const pr2 = new PurchaseRequest(60000, 10002, "购买《葵花宝典》");
  wjzhang.processRequest(pr2);
  const pr3 = new PurchaseRequest(160000, 10003, "购买《金刚经》");
  wjzhang.processRequest(pr3);
  const pr4 = new PurchaseRequest(800000, 10004, "购买桃花岛");
  wjzhang.processRequest(pr4);
};
```
