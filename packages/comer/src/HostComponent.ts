import { Component } from "./Component";
import { HostElement } from "./HostAdapter";

/**
 * Host platform component abstract class,
 * the base class for all host platform components
 */
export abstract class HostComponent<
  P extends object = object,
  E extends HostElement = HostElement,
  T = string,
> extends Component<P> {
  _TYPE_: T;
  type: string;
  hostElement: E;
}
