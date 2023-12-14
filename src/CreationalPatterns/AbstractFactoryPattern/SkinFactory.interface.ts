import { Button } from "./Button.interface";
import { ComboBox } from "./ComboBox.interface";
import { TextField } from "./TextField.interface";

export interface SkinFactory {
  createButton(): Button;
  createTextField(): TextField;
  createComboBox(): ComboBox;
}
