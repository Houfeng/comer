import { isFunction } from "ntils";
import { HostAdapter, HostElement } from "./HostAdapter";
import { Component } from "./Component";
import { AnyFunction } from "./TypeUtil";
import { observable, reactivable } from "ober";
import { HostComponent } from "./HostComponent";
import { Fragment } from "./Fragment";
import { CHILDREN, PARENT, PROPS, REACTIVER } from "./Symbols";
import { isEventName } from "./PropsUtil";
import { Delegate } from "./Delegate";

function createReactiver(build: () => Component, update: () => void) {
  return reactivable(build, { update, batch: true });
}

/**
 * Comer renderer, rendering elements to the host surface
 */
export class Renderer<
  T extends HostAdapter<HostElement>,
  HE = ReturnType<T["createElement"]>,
> {
  /**
   * Create a comer renderer instance using the specified adapter
   * @param adapter Host adapter (eg. DOMAdapter)
   */
  constructor(protected adapter: T) { }

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

  private dispatch<
    M extends keyof Component,
    A extends Component[M] extends AnyFunction ? Component[M] : () => void,
  >(element: Component, method: M, ...args: Parameters<A>) {
    if (!element) return;
    // if unmount，dispose reactiver
    if (method === "unmount") element[REACTIVER]?.unsubscribe();
    // invoke the method
    const fn = element[method];
    if (isFunction(fn)) fn.call(element, ...Array.from(args || []));
    // broadcast to children
    if (!element[CHILDREN]) return;
    element[CHILDREN].forEach((child) => {
      if (element !== child) this.dispatch(child, method, ...args);
    });
  }

  private build(element: Component): Component[] {
    if (!element[REACTIVER]) {
      // Make the props of the instance observable
      element[PROPS] = observable(element[PROPS]);
      // Create a reactiver
      element[REACTIVER] = createReactiver(
        () => element.build(),
        () => this.requestUpdate(element),
      );
    }
    // execute the build wrapper
    const result = element[REACTIVER]();
    // normalize the children
    const children = this.isFragment(element) ? element[CHILDREN] : [result];
    return (children || []).flat(1);
  }

  private findParentHostComponent(element?: Component): HostComponent | void {
    if (!element || !element[PARENT]) return;
    if (this.isHostComponent(element[PARENT])) {
      return element[PARENT];
    }
    return this.findParentHostComponent(element[PARENT]);
  }

  private findParentHostElement(element?: Component): HostElement | void {
    const hostComponent = this.findParentHostComponent(element);
    if (!hostComponent) return;
    return hostComponent.hostElement;
  }

  private findHostComponents(element?: Component): HostComponent[] {
    if (!element || !element[CHILDREN]) return [];
    if (this.isHostComponent(element)) return [element];
    return element[CHILDREN].map((child) =>
      this.findHostComponents(child),
    ).flat(1);
  }

  private findHostElements(element: Component): HostElement[] {
    if (!this.isComponent(element)) return [];
    return this.findHostComponents(element)
      .map((it) => it.hostElement)
      .filter((it) => !!it);
  }

  private compose(element: Component, parent?: Component, deep = false): void {
    if (!this.isComponent(element)) return;
    element[PARENT] = parent;
    if (this.isHostComponent(element) && element.type) {
      element.hostElement = this.adapter.createElement(element.type);
    }
    if (deep) {
      element[CHILDREN] = this.build(element);
      element[CHILDREN].forEach((child) => {
        this.compose(child, element, deep);
      });
    }
    if (this.isHostComponent(element)) {
      const parentHostElement = this.findParentHostElement(element);
      if (parentHostElement && element.hostElement) {
        this.adapter.appendElement(element.hostElement, parentHostElement);
      }
    }
    this.update(element);
    this.bindRef(element);
  }

  private bindRef(element: Component): void {
    if (!this.isComponent(element)) return;
    const { ref } = element[PROPS];
    if (ref) ref.current = element;
  }

  private flushToHostElement(
    hostElement: HostElement,
    willUpdateProps: Record<string, any>,
    willAttachEvents: Record<string, any>,
    willRemoveEvents: Record<string, any>,
  ) {
    if (!hostElement) return;
    this.adapter.updateProps(hostElement, willUpdateProps);
    this.adapter.removeEvents(hostElement, willRemoveEvents);
    this.adapter.attachEvents(hostElement, willAttachEvents);
  }

  private update(
    oldElement: Component,
    newElement: Component = oldElement,
  ): void {
    if (!this.isSomeComponentType(oldElement, newElement)) {
      throw new Error("Update with mismatched types");
    }
    const oldProps: Record<string, any> = oldElement[PROPS];
    const newProps: Record<string, any> = newElement[PROPS];
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
    const isSameKey = oldElement.props.key === newElement.props.key;
    if (!isSameKey) return false;
    if (this.isDelegate(oldElement) && this.isDelegate(newElement)) {
      return this.isSomeDelegateTarget(oldElement, newElement);
    } else {
      return this.isSomeComponentType(oldElement, newElement);
    }
  }

  /** @internal */
  requestUpdate(element: Component): void {
    if (!this.isComponent(element)) return;
    const oldChildren = element[CHILDREN] || [];
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
        this.compose(newChild, element);
        items.push(newChild);
      } else if (oldChild && newChild) {
        // replace
        this.compose(newChild, element);
        this.unmount(oldChild);
        items.push(newChild);
      } else {
        throw new Error("Request update error");
      }
    }
    element[CHILDREN] = items;
  }

  render<T extends Component>(element: T, container: HE): T {
    if (!this.adapter.isHostElement(container)) {
      throw new Error("Invalid host container");
    }
    this.compose(element, void 0, true);
    const hostElements = this.findHostElements(element);
    if (hostElements.some((it) => !this.adapter.isHostElement(it))) {
      throw new Error("Invalid host element");
    }
    hostElements.forEach((it) => this.adapter.appendElement(it, container));
    this.dispatch(element, "mount");
    return element;
  }

  unmount(element: Component): void {
    const hostElements = this.findHostElements(element);
    if (hostElements.some((it) => !this.adapter.isHostElement(it))) {
      throw new Error("Invalid host element");
    }
    hostElements.forEach((it) => this.adapter.removeElement(it));
    this.dispatch(element, "unmount");
  }
}
