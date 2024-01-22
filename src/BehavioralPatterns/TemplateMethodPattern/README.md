Template Method Pattern

The Template Method Pattern defines the skeleton of an algorithm in a method, deferring some steps to subclasses. This pattern allows subclasses to redefine certain steps of an algorithm without changing its structure.

The Template Method Pattern is the simplest behavioral design pattern, consisting only of an inheritance relationship between a superclass and its subclasses.

It encapsulates the implementation of a complex process in a series of basic methods. The abstract superclass provides a method called the template method to define the execution order of these basic methods. The subclasses can override certain steps, resulting in different execution results while maintaining the same algorithm framework.

Therefore, the Template Method Pattern has two roles: the abstract class and the concrete subclasses.

We want to develop an interest calculation module. The system first verifies user information based on the account and password, uses different formulas for calculation depending on the user type, and finally displays the interest.

1. Create an account class to act as the abstract class:

```ts
export abstract class Account {
  // Basic method - concrete method
  validate(account: string, password: string): boolean {
    console.log(`Account: ${account}`);
    console.log(`Password: ${password}`);
    return account === "Wuji Zhang" && password === "123456";
  }

  // Basic method - abstract method
  abstract calculateInterest(): void;

  // Basic method - concrete method
  display(): void {
    console.log("Display interest!");
  }

  // Template method
  handle(account: string, password: string): void {
    if (!this.validate(account, password)) {
      console.log("Invalid account or password");
      return;
    }
    this.calculateInterest();
    this.display();
  }
}
```

2. Create a current account class to act as a concrete subclass:

```ts
import { Account } from "./Account";

export class CurrentAccount extends Account {
  calculateInterest(): void {
    console.log("Calculate interest based on current interest rate!");
  }
}
```

3. Create a saving account class to act as a concrete subclass:

```ts
import { Account } from "./Account";

export class SavingAccount extends Account {
  calculateInterest(): void {
    console.log("Calculate interest based on saving interest rate!");
  }
}
```

4. Create a client test function:

```ts
import { Account } from "./Account";
import { CurrentAccount } from "./CurrentAccount";

export const TemplateMethodPatternClient = () => {
  const account: Account = new CurrentAccount();
  account.handle("Wuji Zhang", "123456");
};
```
