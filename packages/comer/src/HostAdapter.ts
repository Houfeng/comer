import { FLUSH_ID } from "./Symbols";

/**
 * @interface
 */
export type HostElement = object & {
  /** @internal */
  [FLUSH_ID]?: unknown;
};

export type HostEvent = object;
export type HostEventListener = (event: HostEvent) => void;
export type HostElementProps = Record<string, unknown>;
export type HostElementEvents = Record<string, HostEventListener>;

/**
 * Adapt to host platform elements or components
 * @interface
 */
export interface HostAdapter<E extends HostElement> {
  isHostElement(value: unknown): value is E;
  createElement(type: string): E;
  removeElement(element: E): void;
  insertElement(parent: E, element: E, anchor?: E | string): void;
  updateProps(element: E, props: HostElementProps): void;
  attachEvents(element: E, events: HostElementEvents): void;
  removeEvents(element: E, events: HostElementEvents): void;
  requestHostCallback(handler: (time: number) => void): unknown;
  cancelHostCallback(id: unknown): void;
}
