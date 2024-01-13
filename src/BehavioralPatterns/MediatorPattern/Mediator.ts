import { Component } from "./Component";

export abstract class Mediator {
  abstract componentChanged(component: Component): void;
}
