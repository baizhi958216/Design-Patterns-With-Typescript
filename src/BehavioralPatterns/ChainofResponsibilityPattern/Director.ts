import { Approver } from "./Approver";
import { PurchaseRequest } from "./PurchaseRequest";

export class Director extends Approver {
  constructor(name: string) {
    super(name);
  }

  processRequest(request: PurchaseRequest): void {
    if (request.getAmount() < 50000) {
      console.log(
        `主任${
          this.name
        }审批采购单：${request.getNumber()}金额：${request.getAmount()}元，采购目的${request.getPurpose()}。`
      );
    } else {
      this.successor?.processRequest(request);
    }
  }
}
