# Visitor Pattern

The Visitor Pattern represents an operation to be performed on the elements of an object structure. It allows the user to define new operations on these elements without changing their classes.

The Visitor Pattern consists of two main components: the visitor and the visited elements. Its main purpose is to separate the data structure from the operations performed on the data, allowing new operations to be added without modifying the existing data structure, and also facilitating the addition of new operations.

The visited elements are usually not standalone entities; they are stored in a collection called "object structure." The visitor traverses the object structure to perform operations on the elements stored within it.

Therefore, the Visitor Pattern has five roles: `abstract visitor`, `concrete visitor`, `abstract element`, `concrete element`, and `object structure`.

Create a subsystem for summarizing employee information and aggregating employee data, including employee work hours and salaries. The rules are as follows:

(1) Full-time employees work 40 hours per week. Any hours worked beyond 40 are considered overtime and are compensated at a rate of $100 per hour. Any hours worked less than 40 are deducted from the base salary at a rate of $80 per hour, until the base salary is reduced to zero.

(2) Part-time employees are paid based on their actual working hours.

1. Create an employee class to act as the abstract element:

```ts
import { Department } from "./Department";

export interface Employee {
  accept(handler: Department): void;
}
```

2. Create a department class to act as the abstract visitor:

```ts
import { FulltimeEmployee } from "./FulltimeEmployee";
import { ParttimeEmployee } from "./ParttimeEmployee";

export abstract class Department {
  abstract visit(employee: FulltimeEmployee | ParttimeEmployee): void;
}
```

3. Create a full-time employee class to act as the concrete element:

```ts
import { Department } from "./Department";
import { Employee } from "./Employee";

export class FulltimeEmployee implements Employee {
  #name: string; // employee name
  #weeklyWage: number; // weekly wage
  #workTime: number; // work hours

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
```

4. Create a part-time employee class to act as the concrete element:

```ts
import { Department } from "./Department";
import { Employee } from "./Employee";

export class ParttimeEmployee implements Employee {
  #name: string; // employee name
  #hourWage: number; // hourly wage
  #workTime: number; // work hours

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
```

5. Create a finance department class to act as the concrete visitor:

```ts
import { Department } from "./Department";
import { FulltimeEmployee } from "./FulltimeEmployee";
import { ParttimeEmployee } from "./ParttimeEmployee";

export class FADepartment extends Department {
  visit(employee: FulltimeEmployee | ParttimeEmployee): void {
    const workTime: number = employee.getWorkTime();

    // Visit full-time employees
    if (employee instanceof FulltimeEmployee) {
      let weekWage: number = employee.getWeeklyWage();

      if (workTime > 40) {
        weekWage = weekWage + (workTime - 40) * 100;
      } else if (workTime < 40) {
        weekWage = weekWage - (40 - workTime) * 80;
        if (weekWage < 0) {
          weekWage = 0;
        }
      }

      console.log(
        `Full-time employee ${employee.getName()} earned a weekly wage of ${weekWage}`
      );
    }

    // Visit part-time employees
    if (employee instanceof ParttimeEmployee) {
      const hourWage: number = employee.getHourWage();

      console.log(
        `Part-time employee ${employee.getName()} earned a wage of ${totalWage} for working ${workTime} hours`
      );
    }
  }
}
```

6. Create an object structure to store and manage the employees:

```ts
import { Employee } from "./Employee";

export class EmployeeList {
  #employees: Employee[];

  constructor() {
    this.#employees = [];
  }

  addEmployee(employee: Employee): void {
    this.#employees.push(employee);
  }

  removeEmployee(employee: Employee): void {
    const index = this.#employees.indexOf(employee);
    if (index > -1) {
      this.#employees.splice(index, 1);
    }
  }

  acceptAll(handler: Department): void {
    for (const employee of this.#employees) {
      employee.accept(handler);
    }
  }
}
```

Create a test function client:

```ts
import { Department } from "./Department";
import { EmployeeList } from "./EmployeeList";
import { FulltimeEmployee } from "./FulltimeEmployee";
import { className } from "./config.json";

export const VisitorPatternClient = async () => {
  const list: EmployeeList = new EmployeeList();

  let fte1, fte2, fte3, pte1, pte2;

  fte1 = new FulltimeEmployee("Wuji Zhang", 3200.0, 45);
  fte2 = new FulltimeEmployee("Guo Yang", 2000.0, 40);
  fte3 = new FulltimeEmployee("Yu Duan", 2400.0, 38);
  pte1 = new FulltimeEmployee("Qigong Hong", 80.0, 20);
  pte2 = new FulltimeEmployee("Jing Guo", 60.0, 18);

  list.addEmployee(fte1);
  list.addEmployee(fte2);
  list.addEmployee(fte3);
  list.addEmployee(pte1);
  list.addEmployee(pte2);

  const currentClass = await import(`./${className}`);

  const dep: Department = new currentClass[className]();

  list.accept(dep);
};
```
