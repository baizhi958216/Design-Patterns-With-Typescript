export class PurchaseRequest {
  amount: number;
  purpose: string;
  number: number;
  constructor(amount: number, number: number, purpose: string) {
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
