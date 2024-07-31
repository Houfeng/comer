import { Component } from "./Component";
import { HostElement } from "./HostAdapter";

export abstract class HostComponent<T extends object> extends Component<T> {
  protected type = '';
  protected hostElement: HostElement;
  build(): Component {
    this.__children__ = [];
    return this;
  }
  // update(newProps: T): boolean {
  //   this.__children__.forEach(child=>child.update())
  //   return false;
  // }
}