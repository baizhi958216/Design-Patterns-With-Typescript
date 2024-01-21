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
