import { Button } from "./Button.interface";
import { ComboBox } from "./ComboBox.interface";
import { SkinFactory } from "./SkinFactory.interface";
import { SpringSkinFactory } from "./SpringSkinFactory";
import { TextField } from "./TextField.interface";

export const AbstractFactoryPatternClient = () => {
  const skinFactory: SkinFactory = new SpringSkinFactory();
  const button: Button = skinFactory.createButton();
  const fieldBox: TextField = skinFactory.createTextField();
  const comboBox: ComboBox = skinFactory.createComboBox();
  button.display();
  fieldBox.display();
  comboBox.display();
};
