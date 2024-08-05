export type HostElement = object;
export type HostEvent = object;
export type HostEventListener = (event: HostEvent) => void;
export type HostElementProps = Record<string, unknown>;
export type HostElementEvents = Record<string, HostEventListener>;

/**
 * Adapt to host platform elements or components
 */
export interface HostAdapter<E extends HostElement> {
  isHostElement(value: unknown): value is E;
  createElement(type: string): E;
  removeElement(element: E): void;
  appendElement(element: E, parent: E): void;
  insertElement(element: E, anchor: E): void;
  updateProps(element: E, props: HostElementProps): void;
  attachEvents(element: E, events: HostElementEvents): void;
  removeEvents(element: E, events: HostElementEvents): void;
  idleCallback(handler: () => void): void;
  flushCallback(handler: () => void): void;
}
