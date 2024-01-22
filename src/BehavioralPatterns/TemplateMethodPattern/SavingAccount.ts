import { Account } from "./Account";

export class SavingAccount extends Account {
  calculateInterest(): void {
    console.log("按定期利率计算利息！");
  }
}
