import { Component } from "./Component";
import { HostElement } from "./HostAdapter";
import { Ref } from "./Ref";

/**
 * Host platform component abstract class,
 * the base class for all host platform components
 */
export abstract class HostComponent<
  P extends object = object,
  E extends HostElement = HostElement,
  T = string,
> extends Component<P & { ref?: Ref<HostComponent<P, E, T>> }> {
  _TYPE_: T;
  type: string;
  hostElement: E;
}
