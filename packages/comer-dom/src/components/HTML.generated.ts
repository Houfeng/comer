import { ElementComponent as EC } from "../DOMComponent";

/**
 * HTML Tag: a
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/a
 * @see https://developer.mozilla.org/docs/Web/API/HTMLAnchorElement
 */
export class A extends EC<HTMLAnchorElement, HTMLElementEventMap> {
  readonly type = "a"
}

/**
 * HTML Tag: abbr
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/abbr
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Abbr extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "abbr"
}

/**
 * HTML Tag: address
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/address
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Address extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "address"
}

/**
 * HTML Tag: area
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/area
 * @see https://developer.mozilla.org/docs/Web/API/HTMLAreaElement
 */
export class Area extends EC<HTMLAreaElement, HTMLElementEventMap> {
  readonly type = "area"
}

/**
 * HTML Tag: article
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/article
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Article extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "article"
}

/**
 * HTML Tag: aside
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/aside
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Aside extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "aside"
}

/**
 * HTML Tag: audio
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/audio
 * @see https://developer.mozilla.org/docs/Web/API/HTMLAudioElement
 */
export class Audio extends EC<HTMLAudioElement, HTMLVideoElementEventMap> {
  readonly type = "audio"
}

/**
 * HTML Tag: b
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/b
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class B extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "b"
}

/**
 * HTML Tag: base
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/base
 * @see https://developer.mozilla.org/docs/Web/API/HTMLBaseElement
 */
export class Base extends EC<HTMLBaseElement, HTMLElementEventMap> {
  readonly type = "base"
}

/**
 * HTML Tag: bdi
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/bdi
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Bdi extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "bdi"
}

/**
 * HTML Tag: bdo
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/bdo
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Bdo extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "bdo"
}

/**
 * HTML Tag: blockquote
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/blockquote
 * @see https://developer.mozilla.org/docs/Web/API/HTMLQuoteElement
 */
export class Blockquote extends EC<HTMLQuoteElement, HTMLElementEventMap> {
  readonly type = "blockquote"
}

/**
 * HTML Tag: body
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/body
 * @see https://developer.mozilla.org/docs/Web/API/HTMLBodyElement
 */
export class Body extends EC<HTMLBodyElement, HTMLElementEventMap> {
  readonly type = "body"
}

/**
 * HTML Tag: br
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/br
 * @see https://developer.mozilla.org/docs/Web/API/HTMLBRElement
 */
export class Br extends EC<HTMLBRElement, HTMLElementEventMap> {
  readonly type = "br"
}

/**
 * HTML Tag: button
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/button
 * @see https://developer.mozilla.org/docs/Web/API/HTMLButtonElement
 */
export class Button extends EC<HTMLButtonElement, HTMLElementEventMap> {
  readonly type = "button"
}

/**
 * HTML Tag: canvas
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/canvas
 * @see https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement
 */
export class Canvas extends EC<HTMLCanvasElement, HTMLElementEventMap> {
  readonly type = "canvas"
}

/**
 * HTML Tag: caption
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/caption
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableCaptionElement
 */
export class Caption extends EC<HTMLTableCaptionElement, HTMLElementEventMap> {
  readonly type = "caption"
}

/**
 * HTML Tag: cite
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/cite
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Cite extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "cite"
}

/**
 * HTML Tag: code
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/code
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Code extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "code"
}

/**
 * HTML Tag: col
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/col
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableColElement
 */
export class Col extends EC<HTMLTableColElement, HTMLElementEventMap> {
  readonly type = "col"
}

/**
 * HTML Tag: colgroup
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/colgroup
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableColElement
 */
export class Colgroup extends EC<HTMLTableColElement, HTMLElementEventMap> {
  readonly type = "colgroup"
}

/**
 * HTML Tag: data
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/data
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDataElement
 */
export class Data extends EC<HTMLDataElement, HTMLElementEventMap> {
  readonly type = "data"
}

/**
 * HTML Tag: datalist
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/datalist
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDataListElement
 */
export class Datalist extends EC<HTMLDataListElement, HTMLElementEventMap> {
  readonly type = "datalist"
}

/**
 * HTML Tag: dd
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/dd
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Dd extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "dd"
}

/**
 * HTML Tag: del
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/del
 * @see https://developer.mozilla.org/docs/Web/API/HTMLModElement
 */
export class Del extends EC<HTMLModElement, HTMLElementEventMap> {
  readonly type = "del"
}

/**
 * HTML Tag: details
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/details
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDetailsElement
 */
export class Details extends EC<HTMLDetailsElement, HTMLElementEventMap> {
  readonly type = "details"
}

/**
 * HTML Tag: dfn
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/dfn
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Dfn extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "dfn"
}

/**
 * HTML Tag: dialog
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/dialog
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDialogElement
 */
export class Dialog extends EC<HTMLDialogElement, HTMLElementEventMap> {
  readonly type = "dialog"
}

/**
 * HTML Tag: div
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/div
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 */
export class Div extends EC<HTMLDivElement, HTMLElementEventMap> {
  readonly type = "div"
}

/**
 * HTML Tag: dl
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/dl
 * @see https://developer.mozilla.org/docs/Web/API/HTMLDListElement
 */
export class Dl extends EC<HTMLDListElement, HTMLElementEventMap> {
  readonly type = "dl"
}

/**
 * HTML Tag: dt
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/dt
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Dt extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "dt"
}

/**
 * HTML Tag: em
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/em
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Em extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "em"
}

/**
 * HTML Tag: embed
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/embed
 * @see https://developer.mozilla.org/docs/Web/API/HTMLEmbedElement
 */
export class Embed extends EC<HTMLEmbedElement, HTMLElementEventMap> {
  readonly type = "embed"
}

/**
 * HTML Tag: fieldset
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/fieldset
 * @see https://developer.mozilla.org/docs/Web/API/HTMLFieldSetElement
 */
export class Fieldset extends EC<HTMLFieldSetElement, HTMLElementEventMap> {
  readonly type = "fieldset"
}

/**
 * HTML Tag: figcaption
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/figcaption
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Figcaption extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "figcaption"
}

/**
 * HTML Tag: figure
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/figure
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Figure extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "figure"
}

/**
 * HTML Tag: footer
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/footer
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Footer extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "footer"
}

/**
 * HTML Tag: form
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/form
 * @see https://developer.mozilla.org/docs/Web/API/HTMLFormElement
 */
export class Form extends EC<HTMLFormElement, HTMLElementEventMap> {
  readonly type = "form"
}

/**
 * HTML Tag: h1
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h1
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 */
export class H1 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  readonly type = "h1"
}

/**
 * HTML Tag: h2
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h2
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 */
export class H2 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  readonly type = "h2"
}

/**
 * HTML Tag: h3
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h3
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 */
export class H3 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  readonly type = "h3"
}

/**
 * HTML Tag: h4
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h4
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 */
export class H4 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  readonly type = "h4"
}

/**
 * HTML Tag: h5
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h5
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 */
export class H5 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  readonly type = "h5"
}

/**
 * HTML Tag: h6
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/h6
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadingElement
 */
export class H6 extends EC<HTMLHeadingElement, HTMLElementEventMap> {
  readonly type = "h6"
}

/**
 * HTML Tag: head
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/head
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHeadElement
 */
export class Head extends EC<HTMLHeadElement, HTMLElementEventMap> {
  readonly type = "head"
}

/**
 * HTML Tag: header
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/header
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Header extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "header"
}

/**
 * HTML Tag: hgroup
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/hgroup
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Hgroup extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "hgroup"
}

/**
 * HTML Tag: hr
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/hr
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHRElement
 */
export class Hr extends EC<HTMLHRElement, HTMLElementEventMap> {
  readonly type = "hr"
}

/**
 * HTML Tag: html
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/html
 * @see https://developer.mozilla.org/docs/Web/API/HTMLHtmlElement
 */
export class Html extends EC<HTMLHtmlElement, HTMLElementEventMap> {
  readonly type = "html"
}

/**
 * HTML Tag: i
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/i
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class I extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "i"
}

/**
 * HTML Tag: iframe
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/iframe
 * @see https://developer.mozilla.org/docs/Web/API/HTMLIFrameElement
 */
export class Iframe extends EC<HTMLIFrameElement, HTMLElementEventMap> {
  readonly type = "iframe"
}

/**
 * HTML Tag: img
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/img
 * @see https://developer.mozilla.org/docs/Web/API/HTMLImageElement
 */
export class Img extends EC<HTMLImageElement, HTMLElementEventMap> {
  readonly type = "img"
}

/**
 * HTML Tag: input
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/input
 * @see https://developer.mozilla.org/docs/Web/API/HTMLInputElement
 */
export class Input extends EC<HTMLInputElement, HTMLElementEventMap> {
  readonly type = "input"
}

/**
 * HTML Tag: ins
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/ins
 * @see https://developer.mozilla.org/docs/Web/API/HTMLModElement
 */
export class Ins extends EC<HTMLModElement, HTMLElementEventMap> {
  readonly type = "ins"
}

/**
 * HTML Tag: kbd
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/kbd
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Kbd extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "kbd"
}

/**
 * HTML Tag: label
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/label
 * @see https://developer.mozilla.org/docs/Web/API/HTMLLabelElement
 */
export class Label extends EC<HTMLLabelElement, HTMLElementEventMap> {
  readonly type = "label"
}

/**
 * HTML Tag: legend
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/legend
 * @see https://developer.mozilla.org/docs/Web/API/HTMLLegendElement
 */
export class Legend extends EC<HTMLLegendElement, HTMLElementEventMap> {
  readonly type = "legend"
}

/**
 * HTML Tag: li
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/li
 * @see https://developer.mozilla.org/docs/Web/API/HTMLLIElement
 */
export class Li extends EC<HTMLLIElement, HTMLElementEventMap> {
  readonly type = "li"
}

/**
 * HTML Tag: link
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/link
 * @see https://developer.mozilla.org/docs/Web/API/HTMLLinkElement
 */
export class Link extends EC<HTMLLinkElement, HTMLElementEventMap> {
  readonly type = "link"
}

/**
 * HTML Tag: main
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/main
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Main extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "main"
}

/**
 * HTML Tag: map
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/map
 * @see https://developer.mozilla.org/docs/Web/API/HTMLMapElement
 */
export class Map extends EC<HTMLMapElement, HTMLElementEventMap> {
  readonly type = "map"
}

/**
 * HTML Tag: mark
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/mark
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Mark extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "mark"
}

/**
 * HTML Tag: menu
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/menu
 * @see https://developer.mozilla.org/docs/Web/API/HTMLMenuElement
 */
export class Menu extends EC<HTMLMenuElement, HTMLElementEventMap> {
  readonly type = "menu"
}

/**
 * HTML Tag: meta
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/meta
 * @see https://developer.mozilla.org/docs/Web/API/HTMLMetaElement
 */
export class Meta extends EC<HTMLMetaElement, HTMLElementEventMap> {
  readonly type = "meta"
}

/**
 * HTML Tag: meter
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/meter
 * @see https://developer.mozilla.org/docs/Web/API/HTMLMeterElement
 */
export class Meter extends EC<HTMLMeterElement, HTMLElementEventMap> {
  readonly type = "meter"
}

/**
 * HTML Tag: nav
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/nav
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Nav extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "nav"
}

/**
 * HTML Tag: noscript
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/noscript
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Noscript extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "noscript"
}

/**
 * HTML Tag: object
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/object
 * @see https://developer.mozilla.org/docs/Web/API/HTMLObjectElement
 */
export class Object extends EC<HTMLObjectElement, HTMLElementEventMap> {
  readonly type = "object"
}

/**
 * HTML Tag: ol
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/ol
 * @see https://developer.mozilla.org/docs/Web/API/HTMLOListElement
 */
export class Ol extends EC<HTMLOListElement, HTMLElementEventMap> {
  readonly type = "ol"
}

/**
 * HTML Tag: optgroup
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/optgroup
 * @see https://developer.mozilla.org/docs/Web/API/HTMLOptGroupElement
 */
export class Optgroup extends EC<HTMLOptGroupElement, HTMLElementEventMap> {
  readonly type = "optgroup"
}

/**
 * HTML Tag: option
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/option
 * @see https://developer.mozilla.org/docs/Web/API/HTMLOptionElement
 */
export class Option extends EC<HTMLOptionElement, HTMLElementEventMap> {
  readonly type = "option"
}

/**
 * HTML Tag: output
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/output
 * @see https://developer.mozilla.org/docs/Web/API/HTMLOutputElement
 */
export class Output extends EC<HTMLOutputElement, HTMLElementEventMap> {
  readonly type = "output"
}

/**
 * HTML Tag: p
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/p
 * @see https://developer.mozilla.org/docs/Web/API/HTMLParagraphElement
 */
export class P extends EC<HTMLParagraphElement, HTMLElementEventMap> {
  readonly type = "p"
}

/**
 * HTML Tag: picture
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/picture
 * @see https://developer.mozilla.org/docs/Web/API/HTMLPictureElement
 */
export class Picture extends EC<HTMLPictureElement, HTMLElementEventMap> {
  readonly type = "picture"
}

/**
 * HTML Tag: pre
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/pre
 * @see https://developer.mozilla.org/docs/Web/API/HTMLPreElement
 */
export class Pre extends EC<HTMLPreElement, HTMLElementEventMap> {
  readonly type = "pre"
}

/**
 * HTML Tag: progress
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/progress
 * @see https://developer.mozilla.org/docs/Web/API/HTMLProgressElement
 */
export class Progress extends EC<HTMLProgressElement, HTMLElementEventMap> {
  readonly type = "progress"
}

/**
 * HTML Tag: q
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/q
 * @see https://developer.mozilla.org/docs/Web/API/HTMLQuoteElement
 */
export class Q extends EC<HTMLQuoteElement, HTMLElementEventMap> {
  readonly type = "q"
}

/**
 * HTML Tag: rp
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/rp
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Rp extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "rp"
}

/**
 * HTML Tag: rt
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/rt
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Rt extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "rt"
}

/**
 * HTML Tag: ruby
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/ruby
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Ruby extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "ruby"
}

/**
 * HTML Tag: s
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/s
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class S extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "s"
}

/**
 * HTML Tag: samp
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/samp
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Samp extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "samp"
}

/**
 * HTML Tag: script
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/script
 * @see https://developer.mozilla.org/docs/Web/API/HTMLScriptElement
 */
export class Script extends EC<HTMLScriptElement, HTMLElementEventMap> {
  readonly type = "script"
}

/**
 * HTML Tag: search
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/search
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Search extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "search"
}

/**
 * HTML Tag: section
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/section
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Section extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "section"
}

/**
 * HTML Tag: select
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/select
 * @see https://developer.mozilla.org/docs/Web/API/HTMLSelectElement
 */
export class Select extends EC<HTMLSelectElement, HTMLElementEventMap> {
  readonly type = "select"
}

/**
 * HTML Tag: slot
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/slot
 * @see https://developer.mozilla.org/docs/Web/API/HTMLSlotElement
 */
export class Slot extends EC<HTMLSlotElement, HTMLElementEventMap> {
  readonly type = "slot"
}

/**
 * HTML Tag: small
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/small
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Small extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "small"
}

/**
 * HTML Tag: source
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/source
 * @see https://developer.mozilla.org/docs/Web/API/HTMLSourceElement
 */
export class Source extends EC<HTMLSourceElement, HTMLElementEventMap> {
  readonly type = "source"
}

/**
 * HTML Tag: span
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/span
 * @see https://developer.mozilla.org/docs/Web/API/HTMLSpanElement
 */
export class Span extends EC<HTMLSpanElement, HTMLElementEventMap> {
  readonly type = "span"
}

/**
 * HTML Tag: strong
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/strong
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Strong extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "strong"
}

/**
 * HTML Tag: style
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/style
 * @see https://developer.mozilla.org/docs/Web/API/HTMLStyleElement
 */
export class Style extends EC<HTMLStyleElement, HTMLElementEventMap> {
  readonly type = "style"
}

/**
 * HTML Tag: sub
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/sub
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Sub extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "sub"
}

/**
 * HTML Tag: summary
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/summary
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Summary extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "summary"
}

/**
 * HTML Tag: sup
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/sup
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Sup extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "sup"
}

/**
 * HTML Tag: table
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/table
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableElement
 */
export class Table extends EC<HTMLTableElement, HTMLElementEventMap> {
  readonly type = "table"
}

/**
 * HTML Tag: tbody
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/tbody
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableSectionElement
 */
export class Tbody extends EC<HTMLTableSectionElement, HTMLElementEventMap> {
  readonly type = "tbody"
}

/**
 * HTML Tag: td
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/td
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement
 */
export class Td extends EC<HTMLTableCellElement, HTMLElementEventMap> {
  readonly type = "td"
}

/**
 * HTML Tag: template
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/template
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTemplateElement
 */
export class Template extends EC<HTMLTemplateElement, HTMLElementEventMap> {
  readonly type = "template"
}

/**
 * HTML Tag: textarea
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/textarea
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement
 */
export class Textarea extends EC<HTMLTextAreaElement, HTMLElementEventMap> {
  readonly type = "textarea"
}

/**
 * HTML Tag: tfoot
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/tfoot
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableSectionElement
 */
export class Tfoot extends EC<HTMLTableSectionElement, HTMLElementEventMap> {
  readonly type = "tfoot"
}

/**
 * HTML Tag: th
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/th
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableCellElement
 */
export class Th extends EC<HTMLTableCellElement, HTMLElementEventMap> {
  readonly type = "th"
}

/**
 * HTML Tag: thead
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/thead
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableSectionElement
 */
export class Thead extends EC<HTMLTableSectionElement, HTMLElementEventMap> {
  readonly type = "thead"
}

/**
 * HTML Tag: time
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/time
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTimeElement
 */
export class Time extends EC<HTMLTimeElement, HTMLElementEventMap> {
  readonly type = "time"
}

/**
 * HTML Tag: title
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/title
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTitleElement
 */
export class Title extends EC<HTMLTitleElement, HTMLElementEventMap> {
  readonly type = "title"
}

/**
 * HTML Tag: tr
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/tr
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTableRowElement
 */
export class Tr extends EC<HTMLTableRowElement, HTMLElementEventMap> {
  readonly type = "tr"
}

/**
 * HTML Tag: track
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/track
 * @see https://developer.mozilla.org/docs/Web/API/HTMLTrackElement
 */
export class Track extends EC<HTMLTrackElement, HTMLElementEventMap> {
  readonly type = "track"
}

/**
 * HTML Tag: u
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/u
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class U extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "u"
}

/**
 * HTML Tag: ul
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/ul
 * @see https://developer.mozilla.org/docs/Web/API/HTMLUListElement
 */
export class Ul extends EC<HTMLUListElement, HTMLElementEventMap> {
  readonly type = "ul"
}

/**
 * HTML Tag: var
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/var
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Var extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "var"
}

/**
 * HTML Tag: video
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/video
 * @see https://developer.mozilla.org/docs/Web/API/HTMLVideoElement
 */
export class Video extends EC<HTMLVideoElement, HTMLVideoElementEventMap> {
  readonly type = "video"
}

/**
 * HTML Tag: wbr
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/wbr
 * @see https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export class Wbr extends EC<HTMLElement, HTMLElementEventMap> {
  readonly type = "wbr"
}
