import {
  Component,
  ConvertToEvents,
  Fragment,
  HostComponent,
  PickAsProps,
} from "comer";
import { BasicStyle } from "./DOMStyle";

// Host elements --------------------------------------------------------------

export type DOMText = Text;
export type DOMElement = HTMLElement | SVGElement | MathMLElement;
export type DOMCustomAttributes = {
  [K in `x-${string}` | `data-${string}`]: string | number;
};

export type DOMHostElement = DOMElement | DOMText;

// Element wrapper ------------------------------------------------------------

export type ElementProps<
  TElement extends DOMElement,
  TEvents extends ElementEventMap,
> = Partial<
  PickAsProps<TElement> &
    ConvertToEvents<TEvents, { target: TElement }> &
    ARIAMixin &
    DOMCustomAttributes & {
      style: BasicStyle | string;
      children: Component | Component[];
    }
>;

export class ElementComponent<
  TElement extends DOMElement = DOMElement,
  TEvents extends ElementEventMap = ElementEventMap,
> extends HostComponent<ElementProps<TElement, TEvents>, TElement> {
  build(): Component {
    return new Fragment(this.props.children);
  }
}

// Text wrapper ---------------------------------------------------------------

export type TextProps = { textContent?: string };

export class TextComponent extends HostComponent<TextProps, DOMText> {
  static readonly type = "text";
  constructor(textContent: string) {
    super({ textContent });
  }
  build(): Component {
    return new Fragment();
  }
}

/**
 * Text node
 * @see https://developer.mozilla.org/docs/Web/API/Text
 */
export const TextContent = TextComponent;
