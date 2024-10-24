import { $Flush } from "./Symbols";

type HostElementFlushInfo = {
  handler: () => void;
  willUpdateProps: Record<string, any>;
  willAttachEvents: Record<string, any>;
  willRemoveEvents: Record<string, any>;
};

/**
 * @interface
 */
export type HostElement = object & {
  /** @internal */
  [$Flush]?: HostElementFlushInfo;
};

export type HostProps = Record<string, unknown>;

export type HostEvent = object;
export type HostEventListener = (event: HostEvent) => void;
export type HostEventMap = Record<string, HostEventListener>;

export type HostIdleDeadline = {
  timeRemaining(): number;
};

export type HostLogger = {
  error(...args: any): void;
  warn(...args: any): void;
  info(...args: any): void;
  log(...args: any): void;
};

/**
 * Adapt to host platform elements or components
 *
 * @interface
 */
export interface HostAdapter<TElement extends HostElement, TRoot = TElement> {
  /**
   * Used for printing logs
   */
  logger: HostLogger;

  /**
   * Bind application root
   *
   * Tips: It can be HostElement or not (By second General parameter),
   *       and some pre binding or initialization behavior
   *       can be performed in this method.
   *
   * @param root App root
   */
  bind(root: TRoot): void;

  /**
   * unbind
   * @param root App root
   */
  unbind(root: TRoot): void;

  /**
   * Is defer supported
   * If false is returned, it will render the defense invalid,
   * just like a fragment.
   */
  isDeferSuported: boolean;

  /**
   * Check if it is a host element
   * @param value
   * @returns {boolean}
   */
  isHostElement(value: unknown): value is TElement;

  /**
   * Create a host element
   * @param type
   * @returns {HostElement}
   */
  createElement(type: string): TElement;

  /**
   * Remove a host element
   * @param element The element to be removed
   * @returns {void}
   */
  removeElement(element: TElement): void;

  /**
   * Insert a host element
   *
   * Case 1: if ( isHostElement(anchor) && anchor !== parent )
   *         Insert into the parent node after Anchor.
   *
   * Case 2: if ( isString(anchor) )
   *         Processed by adapter based on anchor value,
   *         usually processed according to fragment mapping configuration,
   *         currently no need to process.
   *
   * Case 3: Other...
   *         Insert into the parent as firstChild
   *
   * @param parent Parent element
   * @param element The element to be inserted
   * @param anchor Anchor position for insertion
   * @returns {void}
   */
  insertElement(
    parent: TElement,
    element: TElement,
    anchor: TElement | string | void,
  ): void;

  /**
   * Update a set of properties of the host element,
   * reset when the property value is null.
   * @param element Target element
   * @param props Props key/value record
   */
  updateProps(element: TElement, props: HostProps): void;

  /**
   * Bind multiple event handling functions
   * @param element Target element
   * @param events Events key/value record
   */
  attachEvents(element: TElement, events: HostEventMap): void;

  /**
   * Unbind multiple event handling functions
   * @param element Target element
   * @param events Events key/value record
   */
  removeEvents(element: TElement, events: HostEventMap): void;

  /**
   * Add a change and rendering task to the host's main loop
   *
   * Tips: For browser environments, rAF can be called,
   *       while for other environments,
   *       the handler can also be executed directly
   *
   * @param handler
   */
  requestPaintCallback(handler: (time: number) => void): unknown;

  /**
   * Cancel a change and rendering task from the host's event loop
   * @param id Task id
   */
  cancelPaintCallback(id: unknown): void;

  /**
   *  Add a deferrable task
   *
   * Tips: For browser environments, rIC can be called,
   *       while for other environments, setTimeout can be used to simulate it
   *
   * @param handler
   */
  requestIdleCallback(handler: (deadline: HostIdleDeadline) => void): unknown;

  /**
   * Remove a deferrable task
   * @param id Task id
   */
  cancelIdleCallback(id: unknown): void;
}
