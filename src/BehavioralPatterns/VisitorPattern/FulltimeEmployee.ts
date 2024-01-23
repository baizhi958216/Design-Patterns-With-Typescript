import { Department } from "./Department";
import { Employee } from "./Employee";

export class FulltimeEmployee implements Employee {
  #name: string; // 员工姓名
  #weeklyWage: number; // 员工周薪
  #workTime: number; // 工作时间

  constructor(name: string, weeklyWage: number, workTime: number) {
    this.#name = name;
    this.#weeklyWage = weeklyWage;
    this.#workTime = workTime;
  }

  setName(name: string): void {
    this.#name = name;
  }

  getName(): string {
    return this.#name;
  }

  setWeeklyWage(weeklyWage: number): void {
    this.#weeklyWage = weeklyWage;
  }

  getWeeklyWage(): number {
    return this.#weeklyWage;
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
