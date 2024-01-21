# State Pattern

The State Pattern allows an object to alter its behavior when its internal state changes. The object appears to change its class.

By separating the state of an object from the object itself and encapsulating it into dedicated state classes, the state of the object can be flexibly changed.

The State Pattern is used to address the issues of state transitions for complex objects in a system and encapsulating behavior in different states. It is applicable when an object can exist in multiple states, transitions between these states are possible, and the behavior varies in different states.

Therefore, the State Pattern involves three roles: `Context` (environment class), `Abstract State` (abstract state class), and `Concrete State` (concrete state classes).

Develop a credit card business system for a bank that changes its state based on the account balance.

1. **Abstract State Class:**

```typescript
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

2. **Context Class (Environment Class):**

```typescript
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
    console.log(
      `${this.#owner} opened an account with an initial amount of ${init}`
    );
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
    console.log(`${this.#owner} deposited ${amount}`);
    this.#state.deposit(amount);
    console.log(`Current balance is ${this.#balance}`);
    console.log(`Current account state is ${this.#state.accState}`);
    console.log(`------------------------------------`);
  }
  withdraw(amount: number): void {
    console.log(`${this.#owner} withdrew ${amount}`);
    this.#state.withdraw(amount);
    console.log(`Current balance is ${this.#balance}`);
    console.log(`Current account state is ${this.#state.accState}`);
    console.log(`------------------------------------`);
  }
  computeInterest(): void {
    this.#state.computeInterest();
  }
}
```

3. **Concrete State Class (Normal State):**

```typescript
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
    console.log("Normal state, no interest payment required!");
  }
  stateCheck(): void {
    if (this.acc) {
      if (this.acc.getBalance() > -2000 && this.acc.getBalance() < 0) {
        this.acc?.setState(new OverdraftState(this));
      } else if (this.acc.getBalance() === -2000) {
        this.acc.setState(new RestrictedState(this));
      } else if (this.acc.getBalance() < -2000) {
        console.log("Operation restricted!");
      }
    }
  }
}
```

4. **Concrete State Class (Overdraft State):**

```typescript
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
    console.log("Calculating interest!");
  }
  stateCheck(): void {
    if (this.acc) {
      if (this.acc.getBalance() > 0) {
        this.acc.setState(new NormalState(this.acc));
      } else if (this.acc.getBalance() === -2000) {
        this.acc.setState(new RestrictedState(this));
      } else if (this.acc.getBalance() < -2000) {
        console.log("Operation restricted!");
      }
    }
  }
}
```

5. **Concrete State Class (Restricted State):**

```typescript
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
    console.log("Account restricted, withdrawal failed!");
  }
  computeInterest(): void {
    console.log("Calculating interest!");
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

6. **Client Testing Function:**

```typescript
import { Account } from "./Account";
export const StatePatternClient = () => {
  const acc: Account = new Account("Duan Yu", 0.0);
  acc.deposit(1000);
  acc.withdraw(2000);
  acc.deposit(3000);
  acc.withdraw(4000);
  acc.withdraw(1000);
  acc.computeInterest();
};
```
