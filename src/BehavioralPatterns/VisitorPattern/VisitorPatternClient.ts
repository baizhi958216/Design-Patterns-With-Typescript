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
