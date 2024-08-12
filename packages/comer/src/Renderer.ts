import { HostAdapter, HostElement } from "./HostAdapter";
import { Component, useContext } from "./Component";
import { observable, reactivable } from "ober";
import { HostComponent } from "./HostComponent";
import { Fragment } from "./Fragment";
import {
  $Children,
  $FlushId,
  $Parent,
  $Props,
  $Reactiver,
  $Value,
  $Host,
} from "./Symbols";
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

  private bindReactiver(element: Component) {
    if (element[$Reactiver]) return;
    // Make the props of the instance observable
    element[$Props] = observable(element[$Props]);
    // Create a reactiver
    const trigger = () => this.requestUpdate(element);
    element[$Reactiver] = createReactiver(
      () => element.build(),
      () => {
        const deferrable = this.canDefer(element);
        this.scheduler.perform(trigger, { deferrable });
      },
    );
  }

  private buildElement(element: Component): Component[] {
    if (!element[$Reactiver]) this.bindReactiver(element);
    try {
      // execute the build wrapper
      const result = element[$Reactiver]?.();
      if (!result) return [];
      // normalize the children
      const children = this.isFragment(element) ? element[$Children] : [result];
      return (children || []).flat(1);
    } catch (err) {
      this.adapter.logger.error(err);
      return [];
    }
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
    return hostComponent[$Host] || this.root;
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
      .map((it) => it[$Host])
      .filter((it) => !!it);
  }

  private getHostElementType(element: Component) {
    const ctor = element.constructor;
    return String("type" in ctor ? ctor.type : void 0);
  }

  private createAndApplyProps(
    element: Component,
    parent: Component | undefined,
    deep = false,
  ): void {
    if (!this.isComponent(element)) return;
    element[$Parent] = parent;
    // handle host instance
    if (this.isHostComponent(element)) {
      const hostType = this.isHostComponent(element)
        ? this.getHostElementType(element)
        : void 0;
      if (hostType) element[$Host] = this.adapter.createElement(hostType);
    }
    this.applyNewProps(element);
    // handler children before append document
    if (deep) {
      element[$Children] = this.buildElement(element);
      element[$Children].forEach((child) =>
        this.createAndApplyProps(child, element, deep),
      );
    }
    // append to parent host element
    if (this.isHostComponent(element)) {
      const parentHostElement = this.findParentHostElement(element);
      if (parentHostElement && element[$Host]) {
        this.adapter.insertElement(parentHostElement, element[$Host]);
      } else {
        this.adapter.logger.error("Invalid host component");
      }
    }
    // ---------------------------------------
    this.bindRef(element);
    element.onCreated?.();
  }

  private bindRef(element: Component): void {
    if (!this.isComponent(element)) return;
    const { ref } = element[$Props];
    if (!ref) return;
    ref[$Value] = this.isHostComponent(element) ? element[$Host] : element;
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

  private applyNewProps(
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
    if (this.isHostComponent(oldElement) && oldElement[$Host]) {
      this.flushToHostElement(
        oldElement[$Host],
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
    if (!element) return false;
    if (element instanceof Deferrable) return !!element.value;
    return !!useContext(element, Deferrable);
  }

  private requestUpdate(element: Component): void {
    if (!this.isComponent(element)) return;
    const oldChildren = element[$Children] || [];
    const newChildren = this.buildElement(element) || [];
    const items: Component[] = [];
    const length = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < length; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];
      if (this.canUpdate(oldChild, newChild)) {
        this.applyNewProps(oldChild, newChild);
        items.push(oldChild);
      } else if (oldChild && !newChild) {
        this.unmount(oldChild);
      } else if (!oldChild && newChild) {
        this.createAndApplyProps(newChild, element);
        items.push(newChild);
      } else if (oldChild && newChild) {
        this.createAndApplyProps(newChild, element);
        this.unmount(oldChild);
        items.push(newChild);
      } else {
        throw new Error("Request update error");
      }
    }
    element[$Children] = items;
    element.onUpdated?.();
  }

  private root?: Parameters<T["bindRoot"]>[0];

  /**
   * Render and mount the component tree of the application to the root
   * @param element Element
   * @param root Mount root（HostElement or other supported Host object）
   * @returns
   */
  render<E extends Component>(
    element: E,
    root: Parameters<T["bindRoot"]>[0],
  ): E {
    if (!this.adapter.isHostElement(root)) {
      throw new Error("Invalid host root");
    }
    this.root = root;
    this.adapter.bindRoot(root);
    this.createAndApplyProps(element, void 0, true);
    const hostElements = this.findHostElements(element);
    if (hostElements.some((it) => !this.adapter.isHostElement(it))) {
      throw new Error("Invalid host element");
    }
    hostElements.forEach((it) => this.adapter.insertElement(root, it));
    return element;
  }

  /**
   * Unmount and destroy component subtree
   * @param element Element (Subtree root)
   * @returns
   */
  unmount(element: Component): void {
    if (!element) return;
    element[$Reactiver]?.unsubscribe();
    element.onDestroy?.();
    if (this.isHostComponent(element) && element[$Host]) {
      this.adapter.removeElement(element[$Host]);
    }
    // broadcast to children
    if (!element[$Children]) return;
    element[$Children].forEach((child) =>
      this.scheduler.perform(() => this.unmount(child), { deferrable: true }),
    );
  }

  /**
   * Synchronize triggering component updates,
   * please use with caution as it may cause lag.
   */
  flushSync<H extends () => any>(handler: H): ReturnType<H> {
    return this.scheduler.flushSync(handler);
  }
}
