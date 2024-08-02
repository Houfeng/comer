import { func } from "comer";
import { DOMComponent } from "../DOMComponent";

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
