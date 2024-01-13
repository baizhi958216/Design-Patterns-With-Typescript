import { Button } from "./Button";
import { ComboBox } from "./ComboBox";
import { Component } from "./Component";
import { List } from "./List";
import { Mediator } from "./Mediator";
import { TextBox } from "./TextBox";

export class ConcreteMediator extends Mediator {
  addButton: Button;
  list: List;
  userNameTextBox: TextBox;
  cb: ComboBox;

  constructor() {
    super();
    this.addButton = new Button();
    this.list = new List();
    this.userNameTextBox = new TextBox();
    this.cb = new ComboBox();
  }

  // 封装同事对象之间的交互
  componentChanged(c: Component): void {
    // 单击按钮
    if (c == this.addButton) {
      console.log("--单机增加按钮--");
      this.list.update();
      this.cb.update();
      this.userNameTextBox.update();
    }
    // 从列表框选择客户
    else if (c == this.list) {
      console.log("--从列表框选择客户--");
      this.cb.select();
      this.userNameTextBox.setText();
    }
    // 从组合框选择客户
    else if (c == this.cb) {
      console.log("--从组合框选择客户--");
      this.list.select();
      this.userNameTextBox.setText();
    }
  }
}
