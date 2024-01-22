import { Account } from "./Account";

export class CurrentAccount extends Account {
  calculateInterest(): void {
    console.log("按活期利率计算利息！");
  }
}
