import { Component } from "./Component";

export class ComponentDecorator extends Component {
  #component: Component;

  constructor(component: Component) {
    super();
    this.#component = component;
  }

  display(): void {
    this.#component.display();
  }
}
