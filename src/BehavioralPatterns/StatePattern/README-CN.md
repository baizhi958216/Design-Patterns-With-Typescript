# 状态模式

允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类。

将一个对象的状态从该对象中分离出来，封装到专门的状态类中，使得对象状态可以灵活变化。

状态模式用于解决系统中复杂对象的状态转换以及不同状态下行为的封装问题。当系统中的某个对象存在多个状态，这些状态之间可以进行转换，而且对象在不同状态下行为不相同时可以使用状态模式。

因此，状态模式有 3 个角色：`环境类`，`抽象状态类`，`具体状态类`。

现为银行开发一款信用卡业务系统，如果账户余额大于等于 0 为正常，可以存款也可以取款，如果小于 0 并且大于-2000 为透支，可以存款但是取款需要按天算利息，如果等于-2000，则为受限，只能存款不能取款同时按天计算利息。要实现根据余额更改状态。

1. 新建账户状态类，充当抽象状态类：

```ts
import { Account } from "./Account";

export abstract class AccountState {
  acc: Account | undefined;
  accState: string | undefined;
  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;
  abstract computeInterest(): void;
  abstract stateCheck(): void;
}
```

2. 新建银行账户类，充当环境类：

```ts
import { AccountState } from "./AccountState";
import { NormalState } from "./NormalState";

export class Account {
  #state: AccountState;
  #owner: string;
  #balance: number = 0;

  constructor(owner: string, init: number) {
    this.#owner = owner;
    this.#balance = this.#balance;
    this.#state = new NormalState(this);
    console.log(`${this.#owner}开户，初始金额为${init}`);
    console.log(`------------------------------------`);
  }

  getBalance(): number {
    return this.#balance;
  }

  setBalance(balance: number): void {
    this.#balance = balance;
  }

  setState(state: AccountState): void {
    this.#state = state;
  }

  deposit(amount: number): void {
    console.log(`${this.#owner}存款${amount}`);
    this.#state.deposit(amount);
    console.log(`现在余额为${this.#balance}`);
    console.log(`现在账户状态为${this.#state.accState}`);
    console.log(`------------------------------------`);
  }

  withdraw(amount: number): void {
    console.log(`${this.#owner}取款${amount}`);
    this.#state.withdraw(amount);
    console.log(`现在余额为${this.#balance}`);
    console.log(`现在账户状态为${this.#state.accState}`);
    console.log(`------------------------------------`);
  }

  computeInterest(): void {
    this.#state.computeInterest();
  }
}
```

3. 新建正常状态类，充当具体状态类：

```ts
import { Account } from "./Account";
import { AccountState } from "./AccountState";
import { OverdraftState } from "./OverdraftState";
import { RestrictedState } from "./RestrictedState";

export class NormalState extends AccountState {
  constructor(acc: Account) {
    super();
    this.acc = acc;
    this.accState = "NormalState";
  }

  deposit(amount: number): void {
    if (this.acc) {
      this.acc.setBalance(this.acc.getBalance() + amount);
      this.stateCheck();
    }
  }

  withdraw(amount: number): void {
    if (this.acc) {
      this.acc.setBalance(this.acc.getBalance() - amount);
      this.stateCheck();
    }
  }

  computeInterest(): void {
    console.log("正常状态，无需支付利息！");
  }

  stateCheck(): void {
    if (this.acc) {
      if (this.acc.getBalance() > -2000 && this.acc.getBalance() < 0) {
        this.acc?.setState(new OverdraftState(this));
      } else if (this.acc.getBalance() === -2000) {
        this.acc.setState(new RestrictedState(this));
      } else if (this.acc.getBalance() < -2000) {
        console.log("操作受限！");
      }
    }
  }
}
```

4. 新建透支状态类，充当具体状态类：

```ts
import { AccountState } from "./AccountState";
import { NormalState } from "./NormalState";
import { RestrictedState } from "./RestrictedState";

export class OverdraftState extends AccountState {
  constructor(state: AccountState) {
    super();
    this.acc = state.acc;
    this.accState = "OverdraftState";
  }

  deposit(amount: number): void {
    if (this.acc) {
      this.acc.setBalance(this.acc.getBalance() + amount);
      this.stateCheck();
    }
  }

  withdraw(amount: number): void {
    if (this.acc) {
      this.acc.setBalance(this.acc.getBalance() - amount);
      this.stateCheck();
    }
  }

  computeInterest(): void {
    console.log("计算利息！");
  }

  stateCheck(): void {
    if (this.acc) {
      if (this.acc.getBalance() > 0) {
        this.acc.setState(new NormalState(this.acc));
      } else if (this.acc.getBalance() === -2000) {
        this.acc.setState(new RestrictedState(this));
      } else if (this.acc.getBalance() < -2000) {
        console.log("操作受限！");
      }
    }
  }
}
```

5. 新建受限状态类，充当具体状态类：

```ts
import { AccountState } from "./AccountState";
import { NormalState } from "./NormalState";
import { OverdraftState } from "./OverdraftState";

export class RestrictedState extends AccountState {
  constructor(state: AccountState) {
    super();
    this.acc = state.acc;
    this.accState = "RestrictedState";
  }

  deposit(amount: number): void {
    if (this.acc) {
      this.acc.setBalance(this.acc.getBalance() + amount);
      this.stateCheck();
    }
  }

  withdraw(amount: number): void {
    console.log("账号受限，取款失败！");
  }

  computeInterest(): void {
    console.log("计算利息！");
  }

  stateCheck(): void {
    if (this.acc) {
      if (this.acc.getBalance() > 0) {
        this.acc.setState(new NormalState(this.acc));
      } else if (this.acc.getBalance() > -2000) {
        this.acc.setState(new OverdraftState(this));
      }
    }
  }
}
```

6. 新建客户端测试函数：

```ts
import { Account } from "./Account";

export const StatePatternClient = () => {
  const acc: Account = new Account("段誉", 0.0);
  acc.deposit(1000);
  acc.withdraw(2000);
  acc.deposit(3000);
  acc.withdraw(4000);
  acc.withdraw(1000);
  acc.computeInterest();
};
```
