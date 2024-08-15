import {
  Component,
  ConvertToEvents,
  Fragment,
  HostComponent,
  PickAsProps,
  ComponentType,
} from "comer";
import { BasicStyle, NestedStyle, StyleClass } from "./DOMStyle";

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

// Styled HOC -----------------------------------------------------------------

export interface StyledAble<T extends Component = Component> {
  new (props: { className: string }): T;
}

export function styled<T extends StyledAble>(target: T, style: NestedStyle) {
  const Super = target as ComponentType<any, any>;
  const styledClassName = StyleClass(style);
  class Wrapper extends Super {
    constructor(props: ConstructorParameters<T>[0]) {
      const { className: originClassName = "", ...others } = props || {};
      const className = `${styledClassName} ${originClassName}`.trim();
      const composedProps = { ...others, className };
      if (!new.target || new.target === Wrapper) {
        return new Super(composedProps);
      }
      super(composedProps);
    }
  }
  Object.defineProperty(Wrapper, "name", { value: target.name });
  return Wrapper as T;
}
