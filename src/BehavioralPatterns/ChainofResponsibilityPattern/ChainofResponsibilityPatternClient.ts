import { Approver } from "./Approver";
import { Congress } from "./Congress";
import { Director } from "./Director";
import { President } from "./President";
import { PurchaseRequest } from "./PurchaseRequest";
import { VicePresident } from "./VicePresident";

export const ChainofResponsibilityPatternClient = () => {
  let wjzhang: Approver, gyang: Approver, jguo: Approver, meeting: Approver;
  wjzhang = new Director("张无忌");
  gyang = new VicePresident("杨过");
  jguo = new President("郭靖");
  meeting = new Congress("董事会");

  wjzhang.setSuccessor(gyang);
  gyang.setSuccessor(jguo);
  jguo.setSuccessor(meeting);

  const pr1 = new PurchaseRequest(45000, 10001, "购买倚天剑");
  wjzhang.processRequest(pr1);
  const pr2 = new PurchaseRequest(60000, 10002, "购买《葵花宝典》");
  wjzhang.processRequest(pr2);
  const pr3 = new PurchaseRequest(160000, 10003, "购买《金刚经》");
  wjzhang.processRequest(pr3);
  const pr4 = new PurchaseRequest(800000, 10004, "购买桃花岛");
  wjzhang.processRequest(pr4);
};
