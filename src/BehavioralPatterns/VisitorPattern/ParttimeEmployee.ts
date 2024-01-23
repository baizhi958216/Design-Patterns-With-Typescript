import { Department } from "./Department";
import { Employee } from "./Employee";

export class ParttimeEmployee implements Employee {
  #name: string; // 员工姓名
  #hourWage: number; // 员工时薪
  #workTime: number; // 工作时间

  constructor(name: string, hourWage: number, workTime: number) {
    this.#name = name;
    this.#hourWage = hourWage;
    this.#workTime = workTime;
  }

  setName(name: string): void {
    this.#name = name;
  }

  getName(): string {
    return this.#name;
  }

  setHourWage(hourWage: number): void {
    this.#hourWage = hourWage;
  }

  getHourWage(): number {
    return this.#hourWage;
  }

  setWorkTime(workTime: number): void {
    this.#workTime = workTime;
  }

  getWorkTime(): number {
    return this.#workTime;
  }

  accept(handler: Department): void {
    handler.visit(this);
  }
}
