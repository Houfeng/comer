import { Component } from "./Component";
import { HostElement } from "./HostAdapter";
import { IDENTIFY } from "./Symbols";

/**
 * Host platform component abstract class,
 * the base class for all host platform components
 */
export abstract class HostComponent<
  P extends object = {},
  E extends HostElement = HostElement,
> extends Component<P> {
  [IDENTIFY]: keyof E;
  type: string;
  hostElement: E;
}
