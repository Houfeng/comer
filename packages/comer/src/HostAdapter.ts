export type HostElement = object;
export type HostEventListener = (...args: any) => void;
export type HostElementProps = Record<string, unknown | HostEventListener>;

export interface HostAdapter<T extends HostElement> {
  isElement(value: unknown): value is T;
  setElementProp(element: T, name: string, value: unknown): void;
  bindElementEvent(element: T, name: string, listener: HostEventListener): void;
  unbindElementEvent(element: T, name: string, listener: HostEventListener): void;
  createElement(type: string, props: HostElementProps, ...children: T[]): T;
  removeElement(element: T): void;
  appendChildElement(parent: T, child: T): void;
}
