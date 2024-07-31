import { Component, Fragment, HostComponent } from "comer";
import { DOMElement, DOMEventProps, DOMProps } from "./DOMTypes";

export type DOMComponentProps<E extends DOMElement = DOMElement> =
  DOMProps<E> & { children?: Component[] | Component; }

export class DOMComponent<E extends DOMElement, T, P = {}>
  extends HostComponent<DOMComponentProps<E> & P, E, T> {
  build(): Component {
    return new Fragment(this.props.children);
  }
}

export class Div
  extends DOMComponent<HTMLDivElement, 'div'> { type = 'div' }
export class Span
  extends DOMComponent<HTMLSpanElement, 'span'> { type = 'span'; }
export class P
  extends DOMComponent<HTMLParagraphElement, 'p'> { type = 'p'; }
export class A
  extends DOMComponent<HTMLAnchorElement, 'a'> { type = 'a'; }
export class Img
  extends DOMComponent<HTMLImageElement, 'img'> { type = 'img'; }
export class Iframe
  extends DOMComponent<HTMLIFrameElement, 'iframe'> { type = 'iframe'; }
export class Button
  extends DOMComponent<HTMLButtonElement, 'button'> { type = 'button'; }
export class Input
  extends DOMComponent<HTMLInputElement, 'input'> { type = 'input'; }
export class Form
  extends DOMComponent<HTMLFormElement, 'from'> { type = 'from'; }
export class Dialog
  extends DOMComponent<HTMLDialogElement, 'dialog'> { type = 'dialog'; }
export class Header
  extends DOMComponent<HTMLElement, 'header'> { type = 'header'; }
export class Main
  extends DOMComponent<HTMLElement, 'main'> { type = 'main'; }
export class Footer
  extends DOMComponent<HTMLElement, 'footer'> { type = 'footer'; }
export class Article
  extends DOMComponent<HTMLElement, 'article'> { type = 'article'; }
export class Section
  extends DOMComponent<HTMLElement, 'section'> { type = 'section'; }
export class Video
  extends DOMComponent<
    HTMLVideoElement, 'video',
    Partial<DOMEventProps<HTMLVideoElementEventMap>>
  > { type = 'video'; }
