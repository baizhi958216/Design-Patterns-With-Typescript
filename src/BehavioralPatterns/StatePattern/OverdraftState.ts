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
