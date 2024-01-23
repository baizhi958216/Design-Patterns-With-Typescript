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
