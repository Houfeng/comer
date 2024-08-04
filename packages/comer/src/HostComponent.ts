import { Component } from "./Component";
import { HostElement } from "./HostAdapter";

/**
 * Host platform component abstract class,
 * the base class for all host platform components
 */
export abstract class HostComponent<
  P extends object = {},
  R extends object = {},
  E extends HostElement = HostElement,
> extends Component<P, R> {
  type?: string;
  hostElement?: E;
}
