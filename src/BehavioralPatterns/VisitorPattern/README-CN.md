# 访问者模式

表示一个作用于某对象结构中的各个元素的操作。访问者模式让用户可以在不改变各元素的类的前提下定义作用于这些元素的新操作。

包含访问者和被访问元素两个主要组成部分，主要目的是将数据结构与数据操作分离，使得新增操作不需要修改已有的数据结构，同时也可以方便地增加新的操作。

被访问元素通常不是单独存在的，它们存储在一个集合中，这个集合被称为“对象结构”，访问者通过遍历对象结构实现对其中存储的元素的逐个操作。

因此，访问者模式有 5 各角色：`抽象访问者`，`具体访问者`，`抽象元素`，`具体元素`，`对象结构`。

现在要做一个员工信息汇总的子系统，对员工数据进行汇总，汇总数据包括员工工作时间、员工工资等。制度如下：

(1)正式员工每周工作时间为 40 小时，超过 40 小时部分按照 100 元/小时作为加班费；少于 40 小时所扣工资以 80 元/小时计算，直到基本工资扣除到零为止。

(2)临时工基本工资按小时计算，只需记录实际工作时间。

1. 新建员工类，充当抽象元素类：

```ts
import { Department } from "./Department";

export interface Employee {
  accept(handler: Department): void;
}
```

2. 新建部门类，充当抽象访问者类：

```ts
import { FulltimeEmployee } from "./FulltimeEmployee";
import { ParttimeEmployee } from "./ParttimeEmployee";

export abstract class Department {
  abstract visit(employee: FulltimeEmployee | ParttimeEmployee): void;
}
```

3. 新建全职员工类，充当具体元素类：

```ts
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
```

4. 新建兼职员工类，充当具体元素类：

```ts
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
```

5. 新建财务部类，充当具体访问者类：

```ts
import { Department } from "./Department";
import { FulltimeEmployee } from "./FulltimeEmployee";
import { ParttimeEmployee } from "./ParttimeEmployee";

export class FADepartment extends Department {
  visit(employee: FulltimeEmployee | ParttimeEmployee): void {
    const workTime: number = employee.getWorkTime();

    // 对全职员工的访问
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

      console.log(`正式员工${employee.getName()}实际工资为：${weekWage}元。`);
    }

    // 对临时工的访问
    if (employee instanceof ParttimeEmployee) {
      const hourWage: number = employee.getHourWage();

      console.log(
        `临时工${employee.getName()}实际工资为：${workTime * hourWage}元。`
      );
    }
  }
}
```

6. 新建人力资源部类，充当具体访问者类：

```ts
import { Department } from "./Department";
import { FulltimeEmployee } from "./FulltimeEmployee";
import { ParttimeEmployee } from "./ParttimeEmployee";

export class HRDepartment extends Department {
  visit(employee: FulltimeEmployee | ParttimeEmployee): void {
    const workTime: number = employee.getWorkTime();

    // 人力资源部对全职员工的访问
    if (employee instanceof FulltimeEmployee) {
      if (workTime > 40) {
        console.log(
          `正式员工${employee.getName()}实际工作时间为：${workTime}小时。`
        );
      } else if (workTime < 40) {
        console.log(
          `正式员工${employee.getName()}请假时间为：${40 - workTime}小时。`
        );
      }
    }

    // 人力资源部对兼职员工的访问
    if (employee instanceof ParttimeEmployee) {
      console.log(
        `临时工${employee.getName()}实际工作时间为：${workTime}小时。`
      );
    }
  }
}
```

7. 新建员工列表类，充当对象结构：

```ts
import { Department } from "./Department";
import { Employee } from "./Employee";

export class EmployeeList {
  // 定义一个集合用于存储员工对象
  #list: Array<Employee> = new Array<Employee>();

  addEmployee(employee: Employee): void {
    this.#list.push(employee);
  }

  // 遍历访问员工集合中的每一个员工对象
  accept(handler: Department): void {
    this.#list.forEach((employee) => {
      employee.accept(handler);
    });
  }
}
```

8. config.json：

```json
{
  "className": "FADepartment"
}
```

9. 新建客户端测试函数：

```ts
import { Department } from "./Department";
import { EmployeeList } from "./EmployeeList";
import { FulltimeEmployee } from "./FulltimeEmployee";
import { className } from "./config.json";

export const VisitorPatternClient = async () => {
  const list: EmployeeList = new EmployeeList();

  let fte1, fte2, fte3, pte1, pte2;

  fte1 = new FulltimeEmployee("张无忌", 3200.0, 45);
  fte2 = new FulltimeEmployee("杨过", 2000.0, 40);
  fte3 = new FulltimeEmployee("段誉", 2400.0, 38);
  pte1 = new FulltimeEmployee("洪七公", 80.0, 20);
  pte2 = new FulltimeEmployee("郭靖", 60.0, 18);

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
