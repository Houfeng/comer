import { Component, Fragment, HostComponent, func } from "comer";
import { DOMElement, DOMEventProps, DOMProps, DOMText } from "./DOMTypes";

// ------------------------------- Base --------------------------------------

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

// ------------------------------- Text --------------------------------------

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
export const text = func(TextNode);

// ------------------------------- HTML --------------------------------------

export class Div extends DOMComponent<HTMLDivElement, {}, Div> {
  type = "div";
}
export const div = func(Div);

export class Span extends DOMComponent<HTMLSpanElement, {}, Span> {
  type = "span";
}
export const span = func(Span);

export class P extends DOMComponent<HTMLParagraphElement, {}, P> {
  type = "p";
}
export const p = func(P);

export class A extends DOMComponent<HTMLAnchorElement, {}, A> {
  type = "a";
}
export const a = func(A);

export class Img extends DOMComponent<HTMLImageElement, {}, Img> {
  type = "img";
}
export const img = func(Img);

export class Iframe extends DOMComponent<HTMLIFrameElement, {}, Iframe> {
  type = "iframe";
}
export const iframe = func(Iframe);

export class Button extends DOMComponent<HTMLButtonElement, {}, Button> {
  type = "button";
}
export const button = func(Button);

export class Input extends DOMComponent<HTMLInputElement, {}, Input> {
  type = "input";
}
export const input = func(Input);

export class Form extends DOMComponent<HTMLFormElement, {}, Form> {
  type = "from";
}
export const form = func(Form);

export class Dialog extends DOMComponent<HTMLDialogElement, {}, Dialog> {
  type = "dialog";
}
export const dialog = func(Dialog);

export class Header extends DOMComponent<HTMLElement, {}, Header> {
  type = "header";
}
export const header = func(Header);

export class Main extends DOMComponent<HTMLElement, {}, Main> {
  type = "main";
}
export const main = func(Main);

export class Footer extends DOMComponent<HTMLElement, {}, Footer> {
  type = "footer";
}
export const footer = func(Footer);

export class Ul extends DOMComponent<HTMLElement, {}, Ul> {
  type = "ul";
}
export const ul = func(Ul);

export class Ol extends DOMComponent<HTMLElement, {}, Ol> {
  type = "ol";
}
export const ol = func(Ol);

export class Li extends DOMComponent<HTMLElement, {}, Li> {
  type = "li";
}
export const li = func(Li);

export class Article extends DOMComponent<HTMLElement, {}, Article> {
  type = "article";
}
export const article = func(Article);

export class Section extends DOMComponent<HTMLElement, {}, Section> {
  type = "section";
}
export const section = func(Section);

export class Summary extends DOMComponent<HTMLElement, {}, Summary> {
  type = "section";
}
export const summary = func(Summary);

export class Video extends DOMComponent<
  HTMLVideoElement,
  Partial<DOMEventProps<HTMLVideoElementEventMap>>,
  Video
> {
  type = "video";
}
export const video = func(Video);

export class Audio extends DOMComponent<
  HTMLAudioElement,
  Partial<DOMEventProps<HTMLVideoElementEventMap>>,
  Audio
> {
  type = "audio";
}
export const audio = func(Audio);

// ------------------------------- SVG ---------------------------------------

export class Svg extends DOMComponent<
  SVGElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  Svg
> {
  type = "svg";
}
export const svg = func(Svg);

export class G extends DOMComponent<
  SVGGElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  G
> {
  type = "g";
}
export const g = func(G);

export class Image extends DOMComponent<
  SVGImageElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  Image
> {
  type = "image";
}
export const image = func(Image);

export class SvgText extends DOMComponent<
  SVGTextElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  SvgText
> {
  type = "text";
}
export const svgText = func(SvgText);
export const sText = func(SvgText);

export class TSpan extends DOMComponent<
  SVGTSpanElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  TSpan
> {
  type = "tspan";
}
export const tspan = func(TSpan);
