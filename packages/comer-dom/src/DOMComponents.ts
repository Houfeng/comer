import { Component, Fragment, HostComponent } from "comer";
import { DOMElement, DOMProps } from "./DOMTypes";

export type DOMComponentProps<
  E extends DOMElement = DOMElement,
  C extends Component = Component
> = DOMProps<E> & {
  children?: C[];
}

export class DOMComponent<E extends DOMElement>
  extends HostComponent<DOMComponentProps<E>, E> {
  build(): Component {
    return new Fragment(this.props.children || []);
  }
}

export class Div
  extends DOMComponent<HTMLDivElement> { type = 'div'; }
export class Span
  extends DOMComponent<HTMLSpanElement> { type = 'span'; }
export class P
  extends DOMComponent<HTMLParagraphElement> { type = 'p'; }
export class A
  extends DOMComponent<HTMLAnchorElement> { type = 'a'; }
export class Img
  extends DOMComponent<HTMLImageElement> { type = 'img'; }
export class Iframe
  extends DOMComponent<HTMLIFrameElement> { type = 'iframe'; }
