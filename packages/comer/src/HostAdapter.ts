export type HostElement = object;
export type HostEvent = object;
export type HostEventListener = (event: HostEvent) => void;
export type HostElementProps = Record<string, unknown>;

/**
 * Adapt to host platform elements or components
 */
export interface HostAdapter<E extends HostElement> {
  isHostElement(value: unknown): value is E;
  createElement(type: string): E;
  removeElement(element: E): void;
  appendElement(parent: E, child: E): void;
  insertElement(parent: E, index: number, child: E): void;
  updateElement(element: E, props: HostElementProps): void;
  attachEvent(element: E, name: string, listener: HostEventListener): void;
  removeEvent(element: E, name: string, listener: HostEventListener): void;
}
