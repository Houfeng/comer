import { Component, Fragment, HostComponent } from "comer";
import { ElementAttributes, DOMText, DOMElement } from "./DOMTypes";

// Element -------------------------------------------------------------------

export type ElementComponentProps<
  TElement extends DOMElement = DOMElement,
  TEvents extends ElementEventMap = ElementEventMap,
> = ElementAttributes<TElement, TEvents> & {
  children?: Component | Component[];
};

export class ElementComponent<
  TElement extends DOMElement = DOMElement,
  TEvents extends ElementEventMap = ElementEventMap,
> extends HostComponent<ElementComponentProps<TElement, TEvents>, TElement> {
  build(): Component {
    return new Fragment(this.props.children);
  }
}

// Text ----------------------------------------------------------------------

export type TextComponentProps = { textContent?: string };

export class TextComponent extends HostComponent<TextComponentProps, DOMText> {
  static readonly type = "text_node";
  constructor(textContent: string) {
    super({ textContent });
  }
  build(): Component {
    return new Fragment();
  }
}

export const Text = TextComponent;
export const TextContent = TextComponent;
