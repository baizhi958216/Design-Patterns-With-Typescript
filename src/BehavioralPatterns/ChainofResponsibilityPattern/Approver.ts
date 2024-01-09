import { PurchaseRequest } from "./PurchaseRequest";

export abstract class Approver {
  protected successor: Approver | undefined;
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  // 设置后继者
  setSuccessor(successor: Approver) {
    this.successor = successor;
  }

  // 抽象请求处理方法
  abstract processRequest(purchaseRequest: PurchaseRequest): void;
}
