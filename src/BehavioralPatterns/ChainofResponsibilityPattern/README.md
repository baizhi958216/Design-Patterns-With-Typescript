# Chain of Responsibility Pattern

The Chain of Responsibility pattern aims to decouple the sender and receiver of a request, allowing multiple objects to have the opportunity to handle the request. It connects objects that can handle the request in a chain and passes the request along the chain until an object is capable of handling it.

The chain can take the form of a straight line, a loop, or a tree structure, with each object on the chain acting as a request handler.

Thus, the Chain of Responsibility pattern has two roles: `Abstract Handler` and `Concrete Handler`.

Now, suppose we need to add a purchase approval subsystem to a supply chain management system. A director can approve purchase orders below 50,000 yuan, a vice president can approve orders between 50,000 and 100,000 yuan, the president can approve orders between 100,000 and 500,000 yuan, and orders above 500,000 yuan require board approval.

1. Create a PurchaseRequest class to act as the request class:

```ts
export class PurchaseRequest {
  amount: number;
  purpose: string;
  number: number;
  constructor(amount: number, purpose: string, number: number) {
    this.amount = amount;
    this.purpose = purpose;
    this.number = number;
  }

  setAmount(amount: number): void {
    this.amount = amount;
  }

  getAmount(): number {
    return this.amount;
  }

  setPurpose(purpose: string): void {
    this.purpose = purpose;
  }

  getPurpose(): string {
    return this.purpose;
  }

  setNumber(number: number): void {
    this.number = number;
  }

  getNumber(): number {
    return this.number;
  }
}
```

2. Create an Approver class to act as an abstract handler:

```ts
import { PurchaseRequest } from "./PurchaseRequest";

export abstract class Approver {
  protected successor: Approver | undefined;
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Set the successor
  setSuccessor(successor: Approver) {
    this.successor = successor;
  }

  // Abstract request handling method
  abstract processRequest(purchaseRequest: PurchaseRequest): void;
}
```

3. Create a Director class to act as a concrete handler:

```ts
import { Approver } from "./Approver";
import { PurchaseRequest } from "./PurchaseRequest";

export class Director extends Approver {
  constructor(name: string) {
    super(name);
  }

  processRequest(request: PurchaseRequest): void {
    if (request.getAmount() < 50000) {
      console.log(
        `Director ${
          this.name
        } approves purchase order: ${request.getNumber()} amount: ${request.getAmount()} yuan, purpose: ${request.getPurpose()}.`
      );
    } else {
      this.successor?.processRequest(request);
    }
  }
}
```

4. Create a VicePresident class to act as a concrete handler:

```ts
import { Approver } from "./Approver";
import { PurchaseRequest } from "./PurchaseRequest";

export class VicePresident extends Approver {
  constructor(name: string) {
    super(name);
  }

  processRequest(request: PurchaseRequest): void {
    if (request.getAmount() < 100000) {
      console.log(
        `Vice President ${
          this.name
        } approves purchase order: ${request.getNumber()} amount: ${request.getAmount()} yuan, purpose: ${request.getPurpose()}.`
      );
    } else {
      this.successor?.processRequest(request);
    }
  }
}
```

5. Create a President class to act as a concrete handler:

```ts
import { Approver } from "./Approver";
import { PurchaseRequest } from "./PurchaseRequest";

export class President extends Approver {
  constructor(name: string) {
    super(name);
  }

  processRequest(request: PurchaseRequest): void {
    if (request.getAmount() < 500000) {
      console.log(
        `President ${
          this.name
        } approves purchase order: ${request.getNumber()} amount: ${request.getAmount()} yuan, purpose: ${request.getPurpose()}.`
      );
    } else {
      this.successor?.processRequest(request);
    }
  }
}
```

6. Create a Congress class to act as a concrete handler:

```ts
import { Approver } from "./Approver";
import { PurchaseRequest } from "./PurchaseRequest";

export class Congress extends Approver {
  constructor(name: string) {
    super(name);
  }

  processRequest(request: PurchaseRequest): void {
    console.log(
      `Convene Congress to approve purchase order: ${request.getNumber()} amount: ${request.getAmount()} yuan, purpose: ${request.getPurpose()}.`
    );
  }
}
```

7. Create a client-side testing method:

```ts
import { Approver } from "./Approver";
import { Congress } from "./Congress";
import { Director } from "./Director";
import { President } from "./President";
import { PurchaseRequest } from "./PurchaseRequest";
import { VicePresident } from "./VicePresident";

export const ChainofResponsibilityPatternClient = () => {
  let wjzhang: Approver, gyang: Approver, jguo: Approver, meeting: Approver;
  wjzhang = new Director("Zhang Wuji");
  gyang = new VicePresident("Yang Guo");
  jguo = new President("Guo Jing");
  meeting = new Congress("Board Meeting");

  wjzhang.setSuccessor(gyang);
  gyang.setSuccessor(jguo);
  jguo.setSuccessor(meeting);

  const pr1 = new PurchaseRequest(
    45000,
    10001,
    "Purchase of Heaven-Reliant Sword"
  );
  wjzhang.processRequest(pr1);
  const pr2 = new PurchaseRequest(
    60000,
    10002,
    'Purchase of "The Nine Yin Manual"'
  );
  wjzhang.processRequest(pr2);
  const pr3 = new PurchaseRequest(160000, 10003, 'Purchase of "Diamond Sutra"');
  wjzhang.processRequest(pr3);
  const pr4 = new PurchaseRequest(
    800000,
    10004,
    "Purchase of Peach Blossom Island"
  );
  wjzhang.processRequest(pr4);
};
```
