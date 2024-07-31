import { Component } from "./Component";
import { Fragment } from "./Fragment";
import { HostElement } from "./HostAdapter";

export type HostComponentProps = {
  children?: Component[];
}

export abstract class HostComponent<
  P extends HostComponentProps,
  E extends HostElement,
> extends Component<P> {
  type = '';
  hostElement: E;
  build(): Component {
    return new Fragment(this.props.children || []);
  }
}