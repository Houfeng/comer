import { HostAdapter, HostElement } from "./HostAdapter";
import { Component, useContext } from "./Component";
import { observable, reactivable } from "ober";
import { HostComponent } from "./HostComponent";
import { Fragment } from "./Fragment";
import { $Children, $FlushId, $Parent, $Props, $Reactiver } from "./Symbols";
import { Delegate } from "./Delegate";
import { Deferrable } from "./Deferrable";
import { Scheduler } from "./Scheduler";

function createReactiver(build: () => Component, update: () => void) {
  return reactivable(build, { update, batch: false });
}

function isEventName(name: string) {
  return !!name && /^on/.test(name);
}

/**
 * Comer renderer, rendering elements to the host surface
 */
export class Renderer<T extends HostAdapter<HostElement>> {
  /**
   * Create a comer renderer instance using the specified adapter
   * @param adapter Host adapter (eg. DOMAdapter)
   */
  constructor(protected adapter: T) {}

  private scheduler = new Scheduler(this.adapter);

  private isComponent(value: unknown): value is Component {
    return !!value && value instanceof Component;
  }

  private isHostComponent(value: unknown): value is HostComponent {
    return !!value && value instanceof HostComponent;
  }

  private isFragment(value: unknown): value is Fragment {
    return !!value && value instanceof Fragment;
  }

  private isDelegate(value: unknown) {
    return !!value && value instanceof Delegate;
  }

  private isSomeComponentType(el1: unknown, el2: unknown): boolean {
    return (
      this.isComponent(el1) &&
      this.isComponent(el2) &&
      el1.constructor === el2.constructor
    );
  }

  private isSomeDelegateTarget(el1: unknown, el2: unknown): boolean {
    return (
      this.isDelegate(el1) && this.isDelegate(el2) && el1.Target === el2.Target
    );
  }

  /**
   * Synchronize triggering component updates,
   * please use with caution as it may cause lag.
   */
  flushSync<H extends () => any>(handler: H): ReturnType<H> {
    return this.scheduler.flushSync(handler);
  }

  private build(element: Component): Component[] {
    if (!element[$Reactiver]) {
      // Make the props of the instance observable
      element[$Props] = observable(element[$Props]);
      // Create a reactiver
      const update = () => this.requestUpdate(element);
      element[$Reactiver] = createReactiver(
        () => element.build(),
        () => {
          const deferrable = this.canDefer(element);
          this.scheduler.perform(update, { deferrable });
        },
      );
    }
    // execute the build wrapper
    const result = element[$Reactiver]();
    // normalize the children
    const children = this.isFragment(element) ? element[$Children] : [result];
    return (children || []).flat(1);
  }

  private findParentHostComponent(element?: Component): HostComponent | void {
    if (!element) return;
    let parent = element[$Parent];
    while (parent) {
      if (this.isHostComponent(parent)) return parent;
      parent = parent[$Parent];
    }
  }

  private findParentHostElement(element?: Component): HostElement | void {
    const hostComponent = this.findParentHostComponent(element);
    if (!hostComponent) return this.root;
    return hostComponent.hostElement || this.root;
  }

  private findHostComponents(element?: Component): HostComponent[] {
    if (!element || !element[$Children]) return [];
    if (this.isHostComponent(element)) return [element];
    return element[$Children]
      .map((child) => this.findHostComponents(child))
      .flat(1);
  }

  private findHostElements(element: Component): HostElement[] {
    if (!this.isComponent(element)) return [];
    return this.findHostComponents(element)
      .map((it) => it.hostElement)
      .filter((it) => !!it);
  }

  private create(
    element: Component,
    parent: Component | undefined,
    deep = false,
  ): void {
    if (!this.isComponent(element)) return;
    element[$Parent] = parent;
    if (this.isHostComponent(element) && element.type) {
      element.hostElement = this.adapter.createElement(element.type);
    }
    // handler children before append document
    if (deep) {
      element[$Children] = this.build(element);
      element[$Children].forEach((child) => this.create(child, element, deep));
    }
    // append to parent host element
    if (this.isHostComponent(element)) {
      const parentHostElement = this.findParentHostElement(element);
      if (parentHostElement && element.hostElement) {
        this.adapter.insertElement(parentHostElement, element.hostElement);
      }
    }
    // ---------------------------------------
    this.update(element);
    this.bindRef(element);
    element.onCreated?.();
  }

  private bindRef(element: Component): void {
    if (!this.isComponent(element)) return;
    const { ref } = element[$Props];
    if (ref) ref.current = element;
  }

  private flushToHostElement(
    hostElement: HostElement,
    willUpdateProps: Record<string, any>,
    willAttachEvents: Record<string, any>,
    willRemoveEvents: Record<string, any>,
  ) {
    if (!hostElement) return;
    const flushHandler = () => {
      this.adapter.updateProps(hostElement, willUpdateProps);
      this.adapter.removeEvents(hostElement, willRemoveEvents);
      this.adapter.attachEvents(hostElement, willAttachEvents);
      hostElement[$FlushId] = void 0;
    };
    if (this.scheduler.syncing) return flushHandler();
    if (hostElement[$FlushId]) {
      this.adapter.cancelPaintCallback(hostElement[$FlushId]);
    }
    hostElement[$FlushId] = this.adapter.requestPaintCallback(flushHandler);
  }

  private update(
    oldElement: Component,
    newElement: Component = oldElement,
  ): void {
    if (!this.isSomeComponentType(oldElement, newElement)) {
      throw new Error("Update with mismatched types");
    }
    const oldProps: Record<string, any> = oldElement[$Props];
    const newProps: Record<string, any> = newElement[$Props];
    const willUpdateHostProps: Record<string, any> = {};
    const willAttachHostEvents: Record<string, any> = {};
    const willRemoveHostEvents: Record<string, any> = {};
    // update props : new -> old
    if (oldElement !== newElement) {
      const allKeys = new Set([
        ...Object.keys(oldProps),
        ...Object.keys(newProps),
      ]);
      allKeys.forEach((key) => {
        // props is observable object，Can trigger updates
        // key that does not exist on newProps,
        // needs to be cleared on Old by setting null
        if (oldProps[key] === newProps[key] || key === "ref") return;
        if (isEventName(key)) {
          willAttachHostEvents[key] = newProps[key];
          willRemoveHostEvents[key] = oldProps[key];
          oldProps[key] = newProps[key] ?? null;
        } else {
          oldProps[key] = newProps[key] ?? null;
          willUpdateHostProps[key] = oldProps[key];
        }
      });
    } else {
      Object.entries(oldProps).forEach(([key, value]) => {
        if (key === "ref") return;
        if (isEventName(key)) {
          willAttachHostEvents[key] = value;
        } else {
          willUpdateHostProps[key] = value;
        }
      });
    }
    // flush to host element
    if (this.isHostComponent(oldElement) && oldElement.hostElement) {
      this.flushToHostElement(
        oldElement.hostElement,
        willUpdateHostProps,
        willAttachHostEvents,
        willRemoveHostEvents,
      );
    }
  }

  private canUpdate(oldElement: Component, newElement: Component): boolean {
    if (!oldElement || !newElement) return false;
    const isSameKey = oldElement[$Props].key === newElement[$Props].key;
    if (!isSameKey) return false;
    if (this.isDelegate(oldElement) && this.isDelegate(newElement)) {
      return this.isSomeDelegateTarget(oldElement, newElement);
    } else {
      return this.isSomeComponentType(oldElement, newElement);
    }
  }

  private canDefer(element: Component): boolean {
    return (
      !!element &&
      (element instanceof Deferrable || !!useContext(element, Deferrable))
    );
  }

  private requestUpdate(element: Component): void {
    if (!this.isComponent(element)) return;
    const oldChildren = element[$Children] || [];
    const newChildren = this.build(element) || [];
    const items: Component[] = [];
    const length = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < length; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];
      if (this.canUpdate(oldChild, newChild)) {
        // update
        this.update(oldChild, newChild);
        items.push(oldChild);
      } else if (oldChild && !newChild) {
        // remove
        this.unmount(oldChild);
      } else if (!oldChild && newChild) {
        // append
        this.create(newChild, element, true);
        items.push(newChild);
      } else if (oldChild && newChild) {
        // replace
        this.create(newChild, element, true);
        this.unmount(oldChild);
        items.push(newChild);
      } else {
        throw new Error("Request update error");
      }
    }
    element[$Children] = items;
  }

  private root?: Parameters<T["bindRoot"]>[0];

  render<E extends Component>(
    element: E,
    root: Parameters<T["bindRoot"]>[0],
  ): E {
    if (!this.adapter.isHostElement(root)) {
      throw new Error("Invalid host root");
    }
    this.root = root;
    this.adapter.bindRoot(root);
    this.create(element, void 0, true);
    const hostElements = this.findHostElements(element);
    if (hostElements.some((it) => !this.adapter.isHostElement(it))) {
      throw new Error("Invalid host element");
    }
    hostElements.forEach((it) => this.adapter.insertElement(root, it));
    return element;
  }

  unmount(element: Component): void {
    if (!element) return;
    element[$Reactiver]?.unsubscribe();
    element.onDestroy?.();
    if (this.isHostComponent(element) && element.hostElement) {
      this.adapter.removeElement(element.hostElement);
    }
    // broadcast to children
    if (!element[$Children]) return;
    element[$Children].forEach((child) =>
      this.scheduler.perform(() => this.unmount(child), { deferrable: true }),
    );
  }
}
