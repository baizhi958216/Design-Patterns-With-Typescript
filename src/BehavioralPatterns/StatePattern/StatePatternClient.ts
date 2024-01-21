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
