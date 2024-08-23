import { ElementComponent as EC } from "../DOMComponent";

/**
 * HTML Tag: a
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/a
 * @see https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement
 * @class
 * @sealed
 */
export class A extends EC<HTMLAnchorElement, HTMLElementEventMap> {
  static readonly type = "a";
}

/**
 * HTML Tag: abbr
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/abbr
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Abbr extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "abbr";
}

/**
 * HTML Tag: address
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/address
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Address extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "address";
}

/**
 * HTML Tag: area
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/area
 * @see https://developer.mozilla.org/docs/Web/API/HTMLAreaElement
 * @class
 * @sealed
 */
export class Area extends EC<HTMLAreaElement, HTMLElementEventMap> {
  static readonly type = "area";
}

/**
 * HTML Tag: article
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/article
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Article extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "article";
}

/**
 * HTML Tag: aside
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/aside
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Aside extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "aside";
}

/**
 * HTML Tag: audio
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/audio
 * @see https://developer.mozilla.org/docs/Web/API/HTMLAudioElement
 * @class
 * @sealed
 */
export class Audio extends EC<HTMLAudioElement, HTMLVideoElementEventMap> {
  static readonly type = "audio";
}

/**
 * HTML Tag: b
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/b
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class B extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "b";
}

/**
 * HTML Tag: base
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/base
 * @see https://developer.mozilla.org/docs/Web/API/HTMLBaseElement
 * @class
 * @sealed
 */
export class Base extends EC<HTMLBaseElement, HTMLElementEventMap> {
  static readonly type = "base";
}

/**
 * HTML Tag: bdi
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/bdi
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Bdi extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "bdi";
}

/**
 * HTML Tag: bdo
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/bdo
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Bdo extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "bdo";
}

/**
 * HTML Tag: blockquote
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/blockquote
 * @see https://developer.mozilla.org/docs/Web/API/HTMLQuoteElement
 * @class
 * @sealed
 */
export class Blockquote extends EC<HTMLQuoteElement, HTMLElementEventMap> {
  static readonly type = "blockquote";
}

/**
 * HTML Tag: body
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/body
 * @see https://developer.mozilla.org/docs/Web/API/HTMLBodyElement
 * @class
 * @sealed
 */
export class Body extends EC<HTMLBodyElement, HTMLElementEventMap> {
  static readonly type = "body";
}

/**
 * HTML Tag: br
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/br
 * @see https://developer.mozilla.org/docs/Web/API/HTMLBRElement
 * @class
 * @sealed
 */
export class Br extends EC<HTMLBRElement, HTMLElementEventMap> {
  static readonly type = "br";
}

/**
 * HTML Tag: button
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/button
 * @see https://developer.mozilla.org/docs/Web/API/HTMLButtonElement
 * @class
 * @sealed
 */
export class Button extends EC<HTMLButtonElement, HTMLElementEventMap> {
  static readonly type = "button";
}

/**
 * HTML Tag: canvas
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/canvas
 * @see https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement
 * @class
 * @sealed
 */
export class Canvas extends EC<HTMLCanvasElement, HTMLElementEventMap> {
  static readonly type = "canvas";
}

/**
 * HTML Tag: caption
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/caption
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableCaptionElement
 * @class
 * @sealed
 */
export class Caption extends EC<HTMLTableCaptionElement, HTMLElementEventMap> {
  static readonly type = "caption";
}

/**
 * HTML Tag: cite
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/cite
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Cite extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "cite";
}

/**
 * HTML Tag: code
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/code
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Code extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "code";
}

/**
 * HTML Tag: col
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/col
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableColElement
 * @class
 * @sealed
 */
export class Col extends EC<HTMLTableColElement, HTMLElementEventMap> {
  static readonly type = "col";
}

/**
 * HTML Tag: colgroup
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/colgroup
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableColElement
 * @class
 * @sealed
 */
export class Colgroup extends EC<HTMLTableColElement, HTMLElementEventMap> {
  static readonly type = "colgroup";
}

/**
 * HTML Tag: data
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/data
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDataElement
 * @class
 * @sealed
 */
export class Data extends EC<HTMLDataElement, HTMLElementEventMap> {
  static readonly type = "data";
}

/**
 * HTML Tag: datalist
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/datalist
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDataListElement
 * @class
 * @sealed
 */
export class Datalist extends EC<HTMLDataListElement, HTMLElementEventMap> {
  static readonly type = "datalist";
}

/**
 * HTML Tag: dd
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/dd
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Dd extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "dd";
}

/**
 * HTML Tag: del
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/del
 * @see https://developer.mozilla.org/docs/Web/API/HTMLModElement
 * @class
 * @sealed
 */
export class Del extends EC<HTMLModElement, HTMLElementEventMap> {
  static readonly type = "del";
}

/**
 * HTML Tag: details
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/details
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDetailsElement
 * @class
 * @sealed
 */
export class Details extends EC<HTMLDetailsElement, HTMLElementEventMap> {
  static readonly type = "details";
}

/**
 * HTML Tag: dfn
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/dfn
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Dfn extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "dfn";
}

/**
 * HTML Tag: dialog
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/dialog
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDialogElement
 * @class
 * @sealed
 */
export class Dialog extends EC<HTMLDialogElement, HTMLElementEventMap> {
  static readonly type = "dialog";
}

/**
 * HTML Tag: div
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/div
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 * @class
 * @sealed
 */
export class Div extends EC<HTMLDivElement, HTMLElementEventMap> {
  static readonly type = "div";
}

/**
 * HTML Tag: dl
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/dl
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDListElement
 * @class
 * @sealed
 */
export class Dl extends EC<HTMLDListElement, HTMLElementEventMap> {
  static readonly type = "dl";
}

/**
 * HTML Tag: dt
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/dt
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Dt extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "dt";
}

/**
 * HTML Tag: em
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/em
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Em extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "em";
}

/**
 * HTML Tag: embed
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/embed
 * @see https://developer.mozilla.org/docs/Web/API/HTMLEmbedElement
 * @class
 * @sealed
 */
export class Embed extends EC<HTMLEmbedElement, HTMLElementEventMap> {
  static readonly type = "embed";
}

/**
 * HTML Tag: fieldset
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/fieldset
 * @see https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement
 * @class
 * @sealed
 */
export class Fieldset extends EC<HTMLFieldSetElement, HTMLElementEventMap> {
  static readonly type = "fieldset";
}

/**
 * HTML Tag: figcaption
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/figcaption
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Figcaption extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "figcaption";
}

/**
 * HTML Tag: figure
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/figure
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Figure extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "figure";
}

/**
 * HTML Tag: footer
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/footer
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Footer extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "footer";
}

/**
 * HTML Tag: form
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/form
 * @see https://developer.mozilla.org/docs/Web/API/HTMLFormElement
 * @class
 * @sealed
 */
export class Form extends EC<HTMLFormElement, HTMLElementEventMap> {
  static readonly type = "form";
}

/**
 * HTML Tag: h1
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h1
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 * @class
 * @sealed
 */
export class H1 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  static readonly type = "h1";
}

/**
 * HTML Tag: h2
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h2
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 * @class
 * @sealed
 */
export class H2 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  static readonly type = "h2";
}

/**
 * HTML Tag: h3
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h3
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 * @class
 * @sealed
 */
export class H3 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  static readonly type = "h3";
}

/**
 * HTML Tag: h4
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h4
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 * @class
 * @sealed
 */
export class H4 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  static readonly type = "h4";
}

/**
 * HTML Tag: h5
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h5
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 * @class
 * @sealed
 */
export class H5 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  static readonly type = "h5";
}

/**
 * HTML Tag: h6
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h6
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 * @class
 * @sealed
 */
export class H6 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  static readonly type = "h6";
}

/**
 * HTML Tag: head
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/head
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadElement
 * @class
 * @sealed
 */
export class Head extends EC<HTMLHeadElement, HTMLElementEventMap> {
  static readonly type = "head";
}

/**
 * HTML Tag: header
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/header
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Header extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "header";
}

/**
 * HTML Tag: hgroup
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/hgroup
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Hgroup extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "hgroup";
}

/**
 * HTML Tag: hr
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/hr
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHRElement
 * @class
 * @sealed
 */
export class Hr extends EC<HTMLHRElement, HTMLElementEventMap> {
  static readonly type = "hr";
}

/**
 * HTML Tag: html
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/html
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHtmlElement
 * @class
 * @sealed
 */
export class Html extends EC<HTMLHtmlElement, HTMLElementEventMap> {
  static readonly type = "html";
}

/**
 * HTML Tag: i
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/i
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class I extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "i";
}

/**
 * HTML Tag: iframe
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/iframe
 * @see https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement
 * @class
 * @sealed
 */
export class Iframe extends EC<HTMLIFrameElement, HTMLElementEventMap> {
  static readonly type = "iframe";
}

/**
 * HTML Tag: img
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/img
 * @see https://developer.mozilla.org/docs/Web/API/HTMLImageElement
 * @class
 * @sealed
 */
export class Img extends EC<HTMLImageElement, HTMLElementEventMap> {
  static readonly type = "img";
}

/**
 * HTML Tag: input
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/input
 * @see https://developer.mozilla.org/docs/Web/API/HTMLInputElement
 * @class
 * @sealed
 */
export class Input extends EC<HTMLInputElement, HTMLElementEventMap> {
  static readonly type = "input";
}

/**
 * HTML Tag: ins
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/ins
 * @see https://developer.mozilla.org/docs/Web/API/HTMLModElement
 * @class
 * @sealed
 */
export class Ins extends EC<HTMLModElement, HTMLElementEventMap> {
  static readonly type = "ins";
}

/**
 * HTML Tag: kbd
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/kbd
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Kbd extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "kbd";
}

/**
 * HTML Tag: label
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/label
 * @see https://developer.mozilla.org/docs/Web/API/HTMLLabelElement
 * @class
 * @sealed
 */
export class Label extends EC<HTMLLabelElement, HTMLElementEventMap> {
  static readonly type = "label";
}

/**
 * HTML Tag: legend
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/legend
 * @see https://developer.mozilla.org/docs/Web/API/HTMLLegendElement
 * @class
 * @sealed
 */
export class Legend extends EC<HTMLLegendElement, HTMLElementEventMap> {
  static readonly type = "legend";
}

/**
 * HTML Tag: li
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/li
 * @see https://developer.mozilla.org/docs/Web/API/HTMLLIElement
 * @class
 * @sealed
 */
export class Li extends EC<HTMLLIElement, HTMLElementEventMap> {
  static readonly type = "li";
}

/**
 * HTML Tag: link
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/link
 * @see https://developer.mozilla.org/docs/Web/API/HTMLLinkElement
 * @class
 * @sealed
 */
export class Link extends EC<HTMLLinkElement, HTMLElementEventMap> {
  static readonly type = "link";
}

/**
 * HTML Tag: main
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/main
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Main extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "main";
}

/**
 * HTML Tag: map
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/map
 * @see https://developer.mozilla.org/docs/Web/API/HTMLMapElement
 * @class
 * @sealed
 */
export class Map extends EC<HTMLMapElement, HTMLElementEventMap> {
  static readonly type = "map";
}

/**
 * HTML Tag: mark
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/mark
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Mark extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "mark";
}

/**
 * HTML Tag: menu
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/menu
 * @see https://developer.mozilla.org/docs/Web/API/HTMLMenuElement
 * @class
 * @sealed
 */
export class Menu extends EC<HTMLMenuElement, HTMLElementEventMap> {
  static readonly type = "menu";
}

/**
 * HTML Tag: meta
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/meta
 * @see https://developer.mozilla.org/docs/Web/API/HTMLMetaElement
 * @class
 * @sealed
 */
export class Meta extends EC<HTMLMetaElement, HTMLElementEventMap> {
  static readonly type = "meta";
}

/**
 * HTML Tag: meter
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/meter
 * @see https://developer.mozilla.org/docs/Web/API/HTMLMeterElement
 * @class
 * @sealed
 */
export class Meter extends EC<HTMLMeterElement, HTMLElementEventMap> {
  static readonly type = "meter";
}

/**
 * HTML Tag: nav
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/nav
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Nav extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "nav";
}

/**
 * HTML Tag: noscript
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/noscript
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Noscript extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "noscript";
}

/**
 * HTML Tag: object
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/object
 * @see https://developer.mozilla.org/docs/Web/API/HTMLObjectElement
 * @class
 * @sealed
 */
export class Object extends EC<HTMLObjectElement, HTMLElementEventMap> {
  static readonly type = "object";
}

/**
 * HTML Tag: ol
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/ol
 * @see https://developer.mozilla.org/docs/Web/API/HTMLOListElement
 * @class
 * @sealed
 */
export class Ol extends EC<HTMLOListElement, HTMLElementEventMap> {
  static readonly type = "ol";
}

/**
 * HTML Tag: optgroup
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/optgroup
 * @see https://developer.mozilla.org/docs/Web/API/HTMLOptGroupElement
 * @class
 * @sealed
 */
export class Optgroup extends EC<HTMLOptGroupElement, HTMLElementEventMap> {
  static readonly type = "optgroup";
}

/**
 * HTML Tag: option
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/option
 * @see https://developer.mozilla.org/docs/Web/API/HTMLOptionElement
 * @class
 * @sealed
 */
export class Option extends EC<HTMLOptionElement, HTMLElementEventMap> {
  static readonly type = "option";
}

/**
 * HTML Tag: output
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/output
 * @see https://developer.mozilla.org/docs/Web/API/HTMLOutputElement
 * @class
 * @sealed
 */
export class Output extends EC<HTMLOutputElement, HTMLElementEventMap> {
  static readonly type = "output";
}

/**
 * HTML Tag: p
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/p
 * @see https://developer.mozilla.org/docs/Web/API/HTMLParagraphElement
 * @class
 * @sealed
 */
export class P extends EC<HTMLParagraphElement, HTMLElementEventMap> {
  static readonly type = "p";
}

/**
 * HTML Tag: picture
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/picture
 * @see https://developer.mozilla.org/docs/Web/API/HTMLPictureElement
 * @class
 * @sealed
 */
export class Picture extends EC<HTMLPictureElement, HTMLElementEventMap> {
  static readonly type = "picture";
}

/**
 * HTML Tag: pre
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/pre
 * @see https://developer.mozilla.org/docs/Web/API/HTMLPreElement
 * @class
 * @sealed
 */
export class Pre extends EC<HTMLPreElement, HTMLElementEventMap> {
  static readonly type = "pre";
}

/**
 * HTML Tag: progress
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/progress
 * @see https://developer.mozilla.org/docs/Web/API/HTMLProgressElement
 * @class
 * @sealed
 */
export class Progress extends EC<HTMLProgressElement, HTMLElementEventMap> {
  static readonly type = "progress";
}

/**
 * HTML Tag: q
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/q
 * @see https://developer.mozilla.org/docs/Web/API/HTMLQuoteElement
 * @class
 * @sealed
 */
export class Q extends EC<HTMLQuoteElement, HTMLElementEventMap> {
  static readonly type = "q";
}

/**
 * HTML Tag: rp
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/rp
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Rp extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "rp";
}

/**
 * HTML Tag: rt
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/rt
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Rt extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "rt";
}

/**
 * HTML Tag: ruby
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/ruby
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Ruby extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "ruby";
}

/**
 * HTML Tag: s
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/s
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class S extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "s";
}

/**
 * HTML Tag: samp
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/samp
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Samp extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "samp";
}

/**
 * HTML Tag: script
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/script
 * @see https://developer.mozilla.org/docs/Web/API/HTMLScriptElement
 * @class
 * @sealed
 */
export class Script extends EC<HTMLScriptElement, HTMLElementEventMap> {
  static readonly type = "script";
}

/**
 * HTML Tag: search
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/search
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Search extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "search";
}

/**
 * HTML Tag: section
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/section
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Section extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "section";
}

/**
 * HTML Tag: select
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/select
 * @see https://developer.mozilla.org/docs/Web/API/HTMLSelectElement
 * @class
 * @sealed
 */
export class Select extends EC<HTMLSelectElement, HTMLElementEventMap> {
  static readonly type = "select";
}

/**
 * HTML Tag: slot
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/slot
 * @see https://developer.mozilla.org/docs/Web/API/HTMLSlotElement
 * @class
 * @sealed
 */
export class Slot extends EC<HTMLSlotElement, HTMLElementEventMap> {
  static readonly type = "slot";
}

/**
 * HTML Tag: small
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/small
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Small extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "small";
}

/**
 * HTML Tag: source
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/source
 * @see https://developer.mozilla.org/docs/Web/API/HTMLSourceElement
 * @class
 * @sealed
 */
export class Source extends EC<HTMLSourceElement, HTMLElementEventMap> {
  static readonly type = "source";
}

/**
 * HTML Tag: span
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/span
 * @see https://developer.mozilla.org/docs/Web/API/HTMLSpanElement
 * @class
 * @sealed
 */
export class Span extends EC<HTMLSpanElement, HTMLElementEventMap> {
  static readonly type = "span";
}

/**
 * HTML Tag: strong
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/strong
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Strong extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "strong";
}

/**
 * HTML Tag: style
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/style
 * @see https://developer.mozilla.org/docs/Web/API/HTMLStyleElement
 * @class
 * @sealed
 */
export class Style extends EC<HTMLStyleElement, HTMLElementEventMap> {
  static readonly type = "style";
}

/**
 * HTML Tag: sub
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/sub
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Sub extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "sub";
}

/**
 * HTML Tag: summary
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/summary
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Summary extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "summary";
}

/**
 * HTML Tag: sup
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/sup
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Sup extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "sup";
}

/**
 * HTML Tag: table
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/table
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableElement
 * @class
 * @sealed
 */
export class Table extends EC<HTMLTableElement, HTMLElementEventMap> {
  static readonly type = "table";
}

/**
 * HTML Tag: tbody
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/tbody
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableSectionElement
 * @class
 * @sealed
 */
export class Tbody extends EC<HTMLTableSectionElement, HTMLElementEventMap> {
  static readonly type = "tbody";
}

/**
 * HTML Tag: td
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/td
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement
 * @class
 * @sealed
 */
export class Td extends EC<HTMLTableCellElement, HTMLElementEventMap> {
  static readonly type = "td";
}

/**
 * HTML Tag: template
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/template
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTemplateElement
 * @class
 * @sealed
 */
export class Template extends EC<HTMLTemplateElement, HTMLElementEventMap> {
  static readonly type = "template";
}

/**
 * HTML Tag: textarea
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/textarea
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement
 * @class
 * @sealed
 */
export class Textarea extends EC<HTMLTextAreaElement, HTMLElementEventMap> {
  static readonly type = "textarea";
}

/**
 * HTML Tag: tfoot
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/tfoot
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableSectionElement
 * @class
 * @sealed
 */
export class Tfoot extends EC<HTMLTableSectionElement, HTMLElementEventMap> {
  static readonly type = "tfoot";
}

/**
 * HTML Tag: th
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/th
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement
 * @class
 * @sealed
 */
export class Th extends EC<HTMLTableCellElement, HTMLElementEventMap> {
  static readonly type = "th";
}

/**
 * HTML Tag: thead
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/thead
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableSectionElement
 * @class
 * @sealed
 */
export class Thead extends EC<HTMLTableSectionElement, HTMLElementEventMap> {
  static readonly type = "thead";
}

/**
 * HTML Tag: time
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/time
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTimeElement
 * @class
 * @sealed
 */
export class Time extends EC<HTMLTimeElement, HTMLElementEventMap> {
  static readonly type = "time";
}

/**
 * HTML Tag: title
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/title
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTitleElement
 * @class
 * @sealed
 */
export class Title extends EC<HTMLTitleElement, HTMLElementEventMap> {
  static readonly type = "title";
}

/**
 * HTML Tag: tr
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/tr
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableRowElement
 * @class
 * @sealed
 */
export class Tr extends EC<HTMLTableRowElement, HTMLElementEventMap> {
  static readonly type = "tr";
}

/**
 * HTML Tag: track
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/track
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTrackElement
 * @class
 * @sealed
 */
export class Track extends EC<HTMLTrackElement, HTMLElementEventMap> {
  static readonly type = "track";
}

/**
 * HTML Tag: u
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/u
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class U extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "u";
}

/**
 * HTML Tag: ul
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/ul
 * @see https://developer.mozilla.org/docs/Web/API/HTMLUListElement
 * @class
 * @sealed
 */
export class Ul extends EC<HTMLUListElement, HTMLElementEventMap> {
  static readonly type = "ul";
}

/**
 * HTML Tag: var
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/var
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Var extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "var";
}

/**
 * HTML Tag: video
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/video
 * @see https://developer.mozilla.org/docs/Web/API/HTMLVideoElement
 * @class
 * @sealed
 */
export class Video extends EC<HTMLVideoElement, HTMLVideoElementEventMap> {
  static readonly type = "video";
}

/**
 * HTML Tag: wbr
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/wbr
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 * @class
 * @sealed
 */
export class Wbr extends EC<HTMLElement, HTMLElementEventMap> {
  static readonly type = "wbr";
}
