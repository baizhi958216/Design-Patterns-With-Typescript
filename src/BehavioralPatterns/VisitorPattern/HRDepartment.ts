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
