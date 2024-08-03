import { DOMComponent } from "../DOMComponent";

export class Div extends DOMComponent<HTMLDivElement, {}, Div> {
  type = "div";
}

export class Span extends DOMComponent<HTMLSpanElement, {}, Span> {
  type = "span";
}

export class P extends DOMComponent<HTMLParagraphElement, {}, P> {
  type = "p";
}

export class A extends DOMComponent<HTMLAnchorElement, {}, A> {
  type = "a";
}

export class Img extends DOMComponent<HTMLImageElement, {}, Img> {
  type = "img";
}

export class Iframe extends DOMComponent<HTMLIFrameElement, {}, Iframe> {
  type = "iframe";
}

export class Button extends DOMComponent<HTMLButtonElement, {}, Button> {
  type = "button";
}

export class Input extends DOMComponent<HTMLInputElement, {}, Input> {
  type = "input";
}

export class Form extends DOMComponent<HTMLFormElement, {}, Form> {
  type = "from";
}

export class Dialog extends DOMComponent<HTMLDialogElement, {}, Dialog> {
  type = "dialog";
}

export class Header extends DOMComponent<HTMLElement, {}, Header> {
  type = "header";
}

export class Main extends DOMComponent<HTMLElement, {}, Main> {
  type = "main";
}

export class Footer extends DOMComponent<HTMLElement, {}, Footer> {
  type = "footer";
}

export class Ul extends DOMComponent<HTMLElement, {}, Ul> {
  type = "ul";
}

export class Ol extends DOMComponent<HTMLElement, {}, Ol> {
  type = "ol";
}

export class Li extends DOMComponent<HTMLElement, {}, Li> {
  type = "li";
}

export class Article extends DOMComponent<HTMLElement, {}, Article> {
  type = "article";
}

export class Section extends DOMComponent<HTMLElement, {}, Section> {
  type = "section";
}

export class Summary extends DOMComponent<HTMLElement, {}, Summary> {
  type = "section";
}
