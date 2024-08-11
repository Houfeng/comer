import { Component } from "./Component";
import { HostElement } from "./HostAdapter";
import { $Host } from "./Symbols";

/**
 * Host platform component abstract class,
 * the base class for all host platform components
 * @abstract
 * @class
 */
export abstract class HostComponent<
  TProps extends object = {},
  TElement extends HostElement = HostElement,
> extends Component<TProps, TElement> {
  readonly type?: string;
  /** @internal */
  [$Host]?: TElement;
}
