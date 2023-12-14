import { Button } from "./Button.interface";
import { ComboBox } from "./ComboBox.interface";
import { SkinFactory } from "./SkinFactory.interface";
import { SummerButton } from "./SummerButton";
import { SummerComboBox } from "./SummerComboBox";
import { SummerTextField } from "./SummerTextField";
import { TextField } from "./TextField.interface";

export class SummerSkinFactory implements SkinFactory {
  createButton(): Button {
    return new SummerButton();
  }

  createTextField(): TextField {
    return new SummerTextField();
  }

  createComboBox(): ComboBox {
    return new SummerComboBox();
  }
}
