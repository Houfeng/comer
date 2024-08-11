import { ConvertToEvents, PickAsProps } from "comer";

// Elements -------------------------------------------------------------------

export const DOMText = Text;
export type DOMText = Text;
export type DOMElement = HTMLElement | SVGElement | MathMLElement;

export type DOMHostElement = DOMElement | DOMText;

// Utils ----------------------------------------------------------------------

type CustomMixin = {
  [K in `x-${string}` | `data-${string}`]: string | number;
};

type StyleMixin = {
  style: string;
};

// Attributes -----------------------------------------------------------------

export type ElementAttributes<
  TElement extends DOMElement,
  TEvents extends ElementEventMap,
> = Partial<
  PickAsProps<TElement> &
    ConvertToEvents<TEvents, { target: TElement }> &
    StyleMixin &
    ARIAMixin &
    CustomMixin
>;
