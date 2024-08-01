import { Component, Fragment, HostComponent, func } from "comer";
import { DOMElement, DOMEventProps, DOMProps, DOMText } from "./DOMTypes";

// ------------------------------- Base --------------------------------------

export type DOMComponentProps<E extends DOMElement = DOMElement> =
  DOMProps<E> & { children?: Component[] | Component };

export class DOMComponent<
  E extends DOMElement,
  T,
  P = {},
> extends HostComponent<DOMComponentProps<E> & P, E, T> {
  build(): Component {
    return new Fragment(this.props.children);
  }
}

// ------------------------------- Text --------------------------------------

export class TextNode extends DOMComponent<
  DOMText,
  "text_node",
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
export const text = func(TextNode);

// ------------------------------- HTML --------------------------------------

export class Div extends DOMComponent<HTMLDivElement, "div"> {
  type = "div";
}
export const div = func(Div);

export class Span extends DOMComponent<HTMLSpanElement, "span"> {
  type = "span";
}
export const span = func(Span);

export class P extends DOMComponent<HTMLParagraphElement, "p"> {
  type = "p";
}
export const p = func(P);

export class A extends DOMComponent<HTMLAnchorElement, "a"> {
  type = "a";
}
export const a = func(A);

export class Img extends DOMComponent<HTMLImageElement, "img"> {
  type = "img";
}
export const img = func(Img);

export class Iframe extends DOMComponent<HTMLIFrameElement, "iframe"> {
  type = "iframe";
}
export const iframe = func(Iframe);

export class Button extends DOMComponent<HTMLButtonElement, "button"> {
  type = "button";
}
export const button = func(Button);

export class Input extends DOMComponent<HTMLInputElement, "input"> {
  type = "input";
}
export const input = func(Input);

export class Form extends DOMComponent<HTMLFormElement, "from"> {
  type = "from";
}
export const form = func(Form);

export class Dialog extends DOMComponent<HTMLDialogElement, "dialog"> {
  type = "dialog";
}
export const dialog = func(Dialog);

export class Header extends DOMComponent<HTMLElement, "header"> {
  type = "header";
}
export const header = func(Header);

export class Main extends DOMComponent<HTMLElement, "main"> {
  type = "main";
}
export const main = func(Main);

export class Footer extends DOMComponent<HTMLElement, "footer"> {
  type = "footer";
}
export const footer = func(Footer);

export class Ul extends DOMComponent<HTMLElement, "ul"> {
  type = "ul";
}
export const ul = func(Ul);

export class Ol extends DOMComponent<HTMLElement, "ol"> {
  type = "ol";
}
export const ol = func(Ol);

export class Li extends DOMComponent<HTMLElement, "li"> {
  type = "li";
}
export const li = func(Li);

export class Article extends DOMComponent<HTMLElement, "article"> {
  type = "article";
}
export const article = func(Article);

export class Section extends DOMComponent<HTMLElement, "section"> {
  type = "section";
}
export const section = func(Section);

export class Summary extends DOMComponent<HTMLElement, "summary"> {
  type = "section";
}
export const summary = func(Summary);

export class Video extends DOMComponent<
  HTMLVideoElement,
  "video",
  Partial<DOMEventProps<HTMLVideoElementEventMap>>
> {
  type = "video";
}
export const video = func(Video);

export class Audio extends DOMComponent<
  HTMLAudioElement,
  "audio",
  Partial<DOMEventProps<HTMLVideoElementEventMap>>
> {
  type = "audio";
}
export const audio = func(Audio);

// ------------------------------- SVG ---------------------------------------

export class Svg extends DOMComponent<
  SVGElement,
  "svg",
  Partial<DOMEventProps<SVGElementEventMap>>
> {
  type = "svg";
}
export const svg = func(Svg);

export class G extends DOMComponent<
  SVGGElement,
  "g",
  Partial<DOMEventProps<SVGElementEventMap>>
> {
  type = "g";
}
export const g = func(G);

export class Image extends DOMComponent<
  SVGImageElement,
  "image",
  Partial<DOMEventProps<SVGElementEventMap>>
> {
  type = "image";
}
export const image = func(Image);

export class SvgText extends DOMComponent<
  SVGTextElement,
  "text",
  Partial<DOMEventProps<SVGElementEventMap>>
> {
  type = "text";
}
export const svgText = func(SvgText);
export const sText = func(SvgText);

export class TSpan extends DOMComponent<
  SVGTSpanElement,
  "tspan",
  Partial<DOMEventProps<SVGElementEventMap>>
> {
  type = "tspan";
}
export const tspan = func(TSpan);
