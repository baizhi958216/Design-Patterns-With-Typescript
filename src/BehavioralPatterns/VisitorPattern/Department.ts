import { FulltimeEmployee } from "./FulltimeEmployee";
import { ParttimeEmployee } from "./ParttimeEmployee";

export abstract class Department {
  abstract visit(employee: FulltimeEmployee | ParttimeEmployee): void;
}
