import { isFunction } from "ntils";
import { HostAdapter, HostElement } from "./HostAdapter";
import { Component } from "./Component";
import { AnyFunction } from "./TypeUtil";
import { nextTick, observable } from "ober";
import { HostComponent } from "./HostComponent";
import { Fragment } from "./Fragment";

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

  private isSomeComponentType(el1: unknown, el2: unknown): boolean {
    return (
      this.isComponent(el1) &&
      this.isComponent(el2) &&
      el1.constructor !== el2.constructor
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
    const fn = element[method];
    if (isFunction(fn)) fn.call(element, ...Array.from(args || []));
    element.__children__.forEach((child) => {
      if (element !== child) this.dispatch(child, method, ...args);
    });
  }

  private build(element: Component): Component[] {
    // Make the props of the instance observable
    element.__props__ = observable(element.__props__);
    // Execute build method
    // TODO: Collect dependencies
    const result = element.build();
    const isFragmentResult = this.isFragment(result) || result === element;
    if (isFragmentResult) result.build();
    const children = isFragmentResult ? result.__children__ : [result];
    return (children || []).flat(1);
  }

  private findParentHostComponent(element?: Component): HostComponent | void {
    if (!element || !element.__parent__) return;
    if (this.isHostComponent(element.__parent__)) {
      return element.__parent__;
    }
    return this.findParentHostComponent(element.__parent__);
  }

  private findParentHostElement(element?: Component): HostElement | void {
    const hostComponent = this.findParentHostComponent(element);
    if (!hostComponent) return;
    return hostComponent.hostElement;
  }

  private findHostComponents(element?: Component): HostComponent[] {
    if (!element) return [];
    if (this.isHostComponent(element)) return [element];
    return element.__children__
      .map((child) => this.findHostComponents(child))
      .flat(1);
  }

  private findHostElements(element: Component): HostElement[] {
    if (!this.isComponent(element)) return [];
    return this.findHostComponents(element).map((it) => it.hostElement);
  }

  private compose(element: Component, parent?: Component): void {
    if (!this.isComponent(element)) return;
    element.__parent__ = parent;
    if (this.isHostComponent(element)) {
      element.hostElement = this.adapter.createElement(element.type);
      this.adapter.updateElement(element.hostElement, element.__props__);
      const parentHostElement = this.findParentHostElement(element);
      if (parentHostElement) {
        this.adapter.appendElement(parentHostElement, element.hostElement);
      }
    }
    element.__children__ = this.build(element);
    element.__children__.forEach((child) => this.compose(child, element));
    // attach ref
    const { ref } = element.__props__;
    if (ref) ref.current = element;
  }

  private update(oldElement: Component, newElement: Component): void {
    if (oldElement === newElement) return;
    if (!this.isSomeComponentType(oldElement, newElement)) {
      throw new Error("Update with mismatched types");
    }
    Object.assign(oldElement.__props__, newElement.__props__);
  }

  /** @internal */
  requestUpdate(element: Component): void {
    if (!this.isComponent(element)) return;
    const oldChildren = element.__children__;
    const newChildren = this.build(element);
    element.__children__ = [];
    newChildren.forEach((newChild, index) => {
      const oldChild = oldChildren[index];
      if (this.isSomeComponentType(oldChild, newChild)) {
        this.update(oldChild, newChild);
        element.__children__.push(oldChild);
      } else {
        this.compose(newChild, element);
        element.__children__.push(newChild);
        nextTick(() => this.dispatch(newChild, "mount"));
      }
    });
  }

  render<T extends Component>(element: T, container: HE): T {
    if (!this.adapter.isHostElement(container)) {
      throw new Error("Invalid host container");
    }
    this.compose(element);
    const hostElements = this.findHostElements(element);
    if (hostElements.some((it) => !this.adapter.isHostElement(it))) {
      throw new Error("Invalid host element");
    }
    hostElements.forEach((it) => this.adapter.appendElement(container, it));
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
