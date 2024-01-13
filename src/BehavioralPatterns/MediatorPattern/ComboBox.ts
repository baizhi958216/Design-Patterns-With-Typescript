import { Component } from "./Component";

export class ComboBox extends Component {
  update(): void {
    console.log("组合框增加一项：张无忌");
  }

  select(): void {
    console.log("组合框选中项：小龙女");
  }
}
