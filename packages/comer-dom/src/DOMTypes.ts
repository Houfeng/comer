import { StringKeyOf, ValueOf, WritablePart } from "comer";

export const DOMText = Text;
export type DOMText = Text;
export type DOMElement = HTMLElement | SVGElement | Text;

export type DOMEventMap = HTMLElementEventMap & SVGElementEventMap;

export type DOMEventProps<
  M extends DOMEventMap = DOMEventMap,
  K extends StringKeyOf<M> = StringKeyOf<M>,
> = Record<`on${Capitalize<K>}`, (event?: M[K]) => void>;

export type DOMPropKeyOf<T extends DOMElement> = {
  [K in keyof T]-?: ValueOf<T, K> extends string | number ? K : never;
}[keyof T];

export type DOMCustomAttributes = {
  [K in `x-${string}` | `data-${string}`]: string | number;
};

export type DOMElementProps<T extends DOMElement> = Partial<
  WritablePart<Pick<T, DOMPropKeyOf<T>>> & DOMEventProps & DOMCustomAttributes
>;
