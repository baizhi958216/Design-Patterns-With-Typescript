import { Department } from "./Department";
import { FulltimeEmployee } from "./FulltimeEmployee";
import { ParttimeEmployee } from "./ParttimeEmployee";

export class FADepartment extends Department {
  visit(employee: FulltimeEmployee | ParttimeEmployee): void {
    const workTime: number = employee.getWorkTime();

    // 财务部对全职员工的访问
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

    // 财务部对临时工的访问
    if (employee instanceof ParttimeEmployee) {
      const hourWage: number = employee.getHourWage();

      console.log(
        `临时工${employee.getName()}实际工资为：${workTime * hourWage}元。`
      );
    }
  }
}
