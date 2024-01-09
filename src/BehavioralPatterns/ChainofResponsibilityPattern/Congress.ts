import { Approver } from "./Approver";
import { PurchaseRequest } from "./PurchaseRequest";

export class Congress extends Approver {
  constructor(name: string) {
    super(name);
  }

  processRequest(request: PurchaseRequest): void {
    console.log(
      `召开董事会审批采购单：${request.getNumber()}金额：${request.getAmount()}元，采购目的${request.getPurpose()}。`
    );
  }
}
