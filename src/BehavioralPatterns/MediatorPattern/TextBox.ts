import { Component } from "./Component";

export class TextBox extends Component {
  update(): void {
    console.log("客户信息增加成功后文本框清空");
  }

  setText(): void {
    console.log("文本框显示：小龙女");
  }
}
