import { Component, Fragment, HostComponent } from "comer";
import { DOMElement, DOMElementProps, DOMText } from "./DOMTypes";

export type DOMComponentProps<
  E extends DOMElement = DOMElement,
  P extends object = {},
> = DOMElementProps<E> & { children?: Component[] | Component } & P;

export class DOMComponent<
  E extends DOMElement = DOMElement,
  R extends object = {},
  P extends object = {},
> extends HostComponent<DOMComponentProps<E, P>, R, E> {
  build(): Component {
    return new Fragment(this.props.children);
  }
}

export class TextNode extends DOMComponent<
  DOMText,
  TextNode,
  { textContent: string }
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

// export class Video extends DOMComponent<
//   HTMLVideoElement,
//   Partial<DOMEventProps<HTMLVideoElementEventMap>>,
//   Video
// > {
//   type = "video";
// }

// export class Audio extends DOMComponent<
//   HTMLAudioElement,
//   Partial<DOMEventProps<HTMLVideoElementEventMap>>,
//   Audio
// > {
//   type = "audio";
// }

// export class Svg extends DOMComponent<
//   SVGElement,
//   Partial<DOMEventProps<SVGElementEventMap>>,
//   Svg
// > {
//   type = "svg";
// }
