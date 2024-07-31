import { StringKeyOf, ValueOf } from "comer";

export type DOMElement = HTMLElement | SVGElement;

export type DOMEventMap = HTMLElementEventMap & SVGElementEventMap;

export type DOMEventProps<
  M extends DOMEventMap = DOMEventMap,
  K extends StringKeyOf<M> = StringKeyOf<M>,
> = Record<`on${Capitalize<K>}`, (event?: M[K]) => void>;

export type DOMPropKeyOf<T extends DOMElement> = {
  [K in keyof T]-?: ValueOf<T, K> extends string | number ? K : never;
}[keyof T];

export type DOMProps<T extends DOMElement> = Partial<
  Pick<T, DOMPropKeyOf<T>> & DOMEventProps
>;
