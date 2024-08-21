import { Override } from "comer";
import { DOMElement, ElementEvents } from "./DOMComponent";

export type HTMLElementEvents<
  TElement extends DOMElement,
  TEvents extends HTMLElementEventMap = HTMLElementEventMap,
> = ElementEvents<TElement, TEvents>;

export type SVGElementEvents<
  TElement extends DOMElement,
  TEvents extends SVGElementEventMap = SVGElementEventMap,
> = ElementEvents<TElement, TEvents>;

export type MathMLElementEvents<
  TElement extends DOMElement,
  TEvents extends MathMLElementEventMap = MathMLElementEventMap,
> = ElementEvents<TElement, TEvents>;

export type GlobalDOMEvent<
  TElement extends DOMElement,
  K extends keyof GlobalEventHandlersEventMap,
> = Override<GlobalEventHandlersEventMap[K], { target: TElement }>;

export type InputEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "input"
>;

export type ChangeEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "change"
>;

export type MouseEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "click"
>;

export type PointerEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "pointerdown"
>;

export type TouchEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "touchstart"
>;

export type KeyboardEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "keypress"
>;

export type FocusEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "focus"
>;

export type DragEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "drag"
>;

export type ClipboardEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "copy"
>;

export type UIEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "reset"
>;

export type TransitionEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "transitionstart"
>;

export type WheelEvent<TElement extends DOMElement> = GlobalDOMEvent<
  TElement,
  "wheel"
>;
