import { ValueOf } from "comer";

export type DOMElement = HTMLElement | SVGElement;

export type DOMEventMap = HTMLElementEventMap & SVGElementEventMap;

export type DOMEvents = {
  [K in keyof DOMEventMap]: (event?: DOMEventMap[K]) => void;
}

export type DOMEventProps<K extends keyof DOMEventMap = keyof DOMEventMap> =
  Record<`on${Capitalize<K>}`, (event?: DOMEventMap[K]) => void>

export type DOMPropKeyOf<T extends DOMElement> = {
  [K in keyof T]-?: ValueOf<T, K> extends string | number ? K : never
}[keyof T];

export type DOMProps<T extends DOMElement> =
  Partial<Pick<T, DOMPropKeyOf<T>> & DOMEventProps>;
