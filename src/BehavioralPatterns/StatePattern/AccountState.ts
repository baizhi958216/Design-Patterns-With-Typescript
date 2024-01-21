import { Account } from "./Account";

export abstract class AccountState {
  acc: Account | undefined;
  accState: string | undefined;
  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;
  abstract computeInterest(): void;
  abstract stateCheck(): void;
}
