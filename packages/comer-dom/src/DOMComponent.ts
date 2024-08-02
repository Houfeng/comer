import { Component, Fragment, HostComponent } from "comer";
import { DOMElement, DOMProps } from "./DOMTypes";

export type DOMComponentProps<
  E extends DOMElement = DOMElement,
  P extends object = {},
> = DOMProps<E> & { children?: Component[] | Component } & P;

export class DOMComponent<
  E extends DOMElement = DOMElement,
  P extends object = {},
  R extends object = {},
> extends HostComponent<DOMComponentProps<E, P>, R, E> {
  build(): Component {
    return new Fragment(this.props.children);
  }
}
