import { Component } from "./Component";
import { HostElement } from "./HostAdapter";

export abstract class HostComponent<
  T extends object,
  E extends HostElement
> extends Component<T> {

  type = '';
  hostElement: E;

  build(): Component {
    this.__children__ = [];
    return this;
  }

}