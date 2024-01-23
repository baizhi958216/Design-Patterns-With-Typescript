import { Department } from "./Department";

export interface Employee {
  accept(handler: Department): void;
}
