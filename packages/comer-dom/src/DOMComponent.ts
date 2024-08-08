import { Component, Fragment, HostComponent } from "comer";
import { DOMElement, DOMElementProps, DOMText } from "./DOMTypes";

export type DOMComponentProps<
  E extends DOMElement = DOMElement,
  P extends object = {},
> = DOMElementProps<E> & { children?: Component[] | Component } & P;

export class DOMComponent<
  E extends DOMElement = DOMElement,
  P extends object = {},
  R extends object = {},
> extends HostComponent<DOMComponentProps<E, P>, R, E> {
  build(): Component {
    return new Fragment(this.props.children);
  }
}

export class TextNode extends DOMComponent<
  DOMText,
  { textContent: string },
  TextNode
> {
  type = "text_node";
  constructor(textContent: string) {
    super({ textContent });
  }
  build(): Component {
    return new Fragment();
  }
}

export const Text = TextNode;
export const TextContent = TextNode;
