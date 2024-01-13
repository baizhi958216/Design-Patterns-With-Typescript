import { Component } from "./Component";

export class List extends Component {
  update(): void {
    console.log("列表框增加一项：张无忌");
  }

  select(): void {
    console.log("列表框选中项：小龙女");
  }
}
