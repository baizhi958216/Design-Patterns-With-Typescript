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
