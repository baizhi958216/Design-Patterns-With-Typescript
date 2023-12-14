import { ComboBox } from "./ComboBox.interface";

export class SummerComboBox implements ComboBox {
  display(): void {
    console.log("夏季风格组合框！");
  }
}
