export abstract class Account {
  // 基本方法——具体方法
  validate(account: string, password: string): boolean {
    console.log(`账号：${account}`);
    console.log(`密码：${password}`);
    return account === "张无忌" && password === "123456";
  }

  // 基本方法——抽象方法
  abstract calculateInterest(): void;

  // 基本方法——具体方法
  display(): void {
    console.log("显示利息！");
  }

  // 模板方法
  handle(account: string, password: string): void {
    if (!this.validate(account, password)) {
      console.log("账号或密码错误");
      return;
    }
    this.calculateInterest();
    this.display();
  }
}
