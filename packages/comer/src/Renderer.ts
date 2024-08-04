import { isFunction } from "ntils";
import { HostAdapter, HostElement } from "./HostAdapter";
import { Component } from "./Component";
import { AnyFunction } from "./TypeUtil";
import { observable, reactivable } from "ober";
import { HostComponent } from "./HostComponent";
import { Fragment } from "./Fragment";
import { CHILDREN, PARENT, PROPS, EVENTS, REACTIVER } from "./Symbols";
import { takeHostEvents } from "./PropsUtil";

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
  constructor(protected adapter: T) {}

  private isComponent(value: unknown): value is Component {
    return !!value && value instanceof Component;
  }

  private isSomeComponentType(el1: unknown, el2: unknown): boolean {
    return (
      this.isComponent(el1) &&
      this.isComponent(el2) &&
      el1.constructor === el2.constructor
    );
  }

  private isHostComponent(value: unknown): value is HostComponent {
    return this.isComponent(value) && value instanceof HostComponent;
  }

  private isFragment(value: unknown): value is Fragment {
    return this.isComponent(value) && value instanceof Fragment;
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
    if (!element) return [];
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
    this.update(element);
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
    this.bindRef(element);
  }

  private bindRef(element: Component): void {
    if (!this.isComponent(element)) return;
    const { ref } = element[PROPS];
    if (ref) ref.current = element;
  }

  private updateHostElement(element: Component) {
    if (!this.isHostComponent(element)) return;
    const { hostElement, [PROPS]: props, [EVENTS]: oldEvents } = element;
    if (!hostElement) return;
    const { events, others } = takeHostEvents(props);
    this.adapter.updateProps(hostElement, others);
    if (oldEvents) {
      this.adapter.removeEvents(hostElement, oldEvents);
    }
    this.adapter.attachEvents(hostElement, events);
    element[EVENTS] = events;
  }

  private update(
    oldElement: Component,
    newElement: Component = oldElement,
  ): void {
    if (!this.isSomeComponentType(oldElement, newElement)) {
      throw new Error("Update with mismatched types");
    }
    // update props : new -> old
    if (oldElement !== newElement) {
      const oldProps: Record<string, unknown> = oldElement[PROPS];
      const newProps: Record<string, unknown> = newElement[PROPS];
      const allKeys = new Set([
        ...Object.keys(oldProps),
        ...Object.keys(newProps),
      ]);
      allKeys.forEach((key) => {
        // props is observable object，Can trigger updates
        // key that does not exist on newProps,
        // needs to be cleared on Old by setting null
        //if (key === "children") return;
        oldProps[key] = newProps[key] ?? null;
      });
      console.log("Update allKeys:", { allKeys });
    }
    // update to host element
    if (this.isHostComponent(oldElement)) this.updateHostElement(oldElement);
  }

  private replace(oldElement: Component, newElement: Component) {
    // const oldHostElements = this.findHostElements(oldElement);
    // const newHostElements = this.findHostElements(oldElement);
    // newHostElements.forEach(it =>this.adapter.appendElement(it));
    // oldHostElements.forEach((it) => this.adapter.removeElement(it));
    this.dispatch(oldElement, "unmount");
    this.dispatch(newElement, "mount");
  }

  /** @internal */
  requestUpdate(element: Component): void {
    if (!this.isComponent(element)) return;
    const oldChildren = element[CHILDREN];
    const newChildren = this.build(element);
    element[CHILDREN] = [];
    newChildren.forEach((newChild, index) => {
      const oldChild = oldChildren[index];
      if (this.isSomeComponentType(oldChild, newChild)) {
        // Same type, reuse host element, update props
        this.update(oldChild, newChild);
        element[CHILDREN].push(oldChild);
        console.log("update", { oldChild, newChild });
      } else {
        // Different types, replace with new host element
        this.compose(newChild, element);
        this.replace(oldChild, newChild);
        element[CHILDREN].push(newChild);
        console.log("replace", { oldChild, newChild });
      }
      // TODO: remove useless elements
    });
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
