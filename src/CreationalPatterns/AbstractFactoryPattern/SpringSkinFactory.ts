import { Button } from "./Button.interface";
import { ComboBox } from "./ComboBox.interface";
import { SkinFactory } from "./SkinFactory.interface";
import { SpringButton } from "./SpringButton";
import { SpringComboBox } from "./SpringComboBox";
import { SpringTextField } from "./SpringTextField";
import { TextField } from "./TextField.interface";

export class SpringSkinFactory implements SkinFactory {
  createButton(): Button {
    return new SpringButton();
  }

  createTextField(): TextField {
    return new SpringTextField();
  }

  createComboBox(): ComboBox {
    return new SpringComboBox();
  }
}
