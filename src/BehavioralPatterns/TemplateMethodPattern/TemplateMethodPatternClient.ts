import { Account } from "./Account";
import { CurrentAccount } from "./CurrentAccount";

export const TemplateMethodPatternClient = () => {
  const account: Account = new CurrentAccount();
  account.handle("张无忌", "123456");
};
