import { $FlushId } from "./Symbols";

/**
 * @interface
 */
export type HostElement = object & {
  /** @internal */
  [$FlushId]?: unknown;
};

export type HostEvent = object;
export type HostEventListener = (event: HostEvent) => void;
export type HostElementProps = Record<string, unknown>;
export type HostElementEvents = Record<string, HostEventListener>;

export type HostIdleDeadline = {
  timeRemaining(): number;
};

/**
 * Adapt to host platform elements or components
 * @interface
 */
export interface HostAdapter<E extends HostElement, R extends E = E> {
  /**
   * Bind application root
   * @param root App root
   */
  bindRoot(root: R): void;

  /**
   * Check if it is a host element
   * @param value
   * @returns {boolean}
   */
  isHostElement(value: unknown): value is E;

  /**
   * Create a host element
   * @param type
   * @returns {HostElement}
   */
  createElement(type: string): E;

  /**
   * Remove a host element
   * @param element The element to be removed
   * @returns {void}
   */
  removeElement(element: E): void;

  /**
   * Insert a host element
   *
   * if (!anchor) :
   *   Append to the last child level of the parent element.
   *
   * if (isHostElement(anchor)) :
   *   After inserting into the anchor element.
   *
   * if (isString(anchor)) :
   *   Processed by adapter based on anchor value,
   *   usually processed according to fragment mapping configuration,
   *   currently no need to process.
   *
   * @param parent Parent element
   * @param element The element to be inserted
   * @param anchor Anchor position for insertion
   * @returns {void}
   */
  insertElement(parent: E, element: E, anchor?: E | string): void;

  /**
   * Update a set of properties of the host element,
   * reset when the property value is null.
   * @param element Target element
   * @param props Props key/value record
   */
  updateProps(element: E, props: HostElementProps): void;

  /**
   * Bind multiple event handling functions
   * @param element Target element
   * @param events Events key/value record
   */
  attachEvents(element: E, events: HostElementEvents): void;

  /**
   * Unbind multiple event handling functions
   * @param element Target element
   * @param events Events key/value record
   */
  removeEvents(element: E, events: HostElementEvents): void;

  /**
   * Add a change and rendering task to the host's main loop
   * @param handler
   */
  requestPaintCallback(handler: (time: number) => void): unknown;

  /**
   * Cancel a change and rendering task from the host's event loop
   * @param id Task id
   */
  cancelPaintCallback(id: unknown): void;

  /**
   * Add a change and rendering task to the host's main loop
   * @param handler
   */
  requestIdleCallback(handler: (deadline: HostIdleDeadline) => void): unknown;

  /**
   * Cancel a change and rendering task from the host's event loop
   * @param id Task id
   */
  cancelIdleCallback(id: unknown): void;
}
