import { Button } from "./Button";
import { ComboBox } from "./ComboBox";
import { ConcreteMediator } from "./ConcreteMediator";
import { List } from "./List";
import { TextBox } from "./TextBox";

export const MediatorPatternClient = () => {
  // 定义中介者对象
  const mediator: ConcreteMediator = new ConcreteMediator();

  // 定义同事对象
  const addBT: Button = new Button();
  const list: List = new List();
  const cb: ComboBox = new ComboBox();
  const userNameTB: TextBox = new TextBox();

  addBT.setMediator(mediator);
  list.setMediator(mediator);
  cb.setMediator(mediator);
  userNameTB.setMediator(mediator);

  mediator.addButton = addBT;
  mediator.list = list;
  mediator.cb = cb;
  mediator.userNameTextBox = userNameTB;

  addBT.changed();
  console.log("--------------------------------");
  list.changed();
};
