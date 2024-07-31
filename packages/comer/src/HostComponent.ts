import { Component } from "./Component";
import { HostElement } from "./HostAdapter";

/**
 * Host platform component abstract class, 
 * the base class for all host platform components
 */
export abstract class HostComponent<
  P extends object,
  E extends HostElement,
> extends Component<P> {
  type = '';
  hostElement: E;
}