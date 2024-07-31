import { Component, HostComponent } from "comer";
import { DOMElement, DOMProps } from "./DOMTypes";

export type DOMComponentProps<
  T extends DOMElement = DOMElement,
  C extends Component = Component
> = DOMProps<T> & {
  children?: C[];
}

export class DOMComponent<T extends DOMElement>
  extends HostComponent<DOMComponentProps<T>, T> { }

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
