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
