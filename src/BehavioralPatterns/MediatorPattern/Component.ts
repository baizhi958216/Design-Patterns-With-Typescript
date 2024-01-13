import { Mediator } from "./Mediator";

export abstract class Component {
  protected mediator: Mediator | undefined;

  setMediator(mediator: Mediator) {
    this.mediator = mediator;
  }

  changed(): void {
    if (this.mediator) {
      this.mediator.componentChanged(this);
    }
  }

  abstract update(): void;
}
