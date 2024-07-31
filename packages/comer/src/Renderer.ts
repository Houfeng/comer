import { isFunction } from 'ntils';
import { HostAdapter, HostElement } from './HostAdapter';
import { Component } from './Component';
import { AnyFunction } from './TypeUtil';
import { nextTick, observable } from 'ober';

/**
 * Comer renderer, rendering elements to the host surface
 */
export class Renderer<T extends HostAdapter<HostElement>> {
  /**
   * Create a comer renderer instance using the specified adapter
   * @param adapter Host adapter (eg. DOMAdapter)
   */
  constructor(protected adapter: T) { }

  private isComponent(value: unknown): value is Component {
    return !!value && value instanceof Component;
  }

  private isSomeComponentType(el1: Component, el2: Component): boolean {
    return !!el1 && !!el2 && el1.constructor !== el2.constructor;
  }

  private build(element: Component): Component[] {
    // Make the props of the instance observable
    element.__props__ = observable(element.__props__);
    // Execute build method
    // TODO: Collect dependencies 
    const result = element.build();
    const children = result !== element ? result.__children__ : [result];
    return (children || []).flat(1);
  }

  private compose(element: Component): void {
    if (!this.isComponent(element)) return;
    element.__children__ = this.build(element);
    element.__children__.forEach(child => this.compose(child));
    element.__compose__?.();
  }

  private update(oldElement: Component, newElement: Component): void {
    if (oldElement === newElement) return;
    if (!this.isSomeComponentType(oldElement, newElement)) {
      throw new Error('Update with mismatched types');
    }
    const allowRendererUpdate = oldElement.update(newElement.__props__);
    if (!allowRendererUpdate) return;
    Object.assign(oldElement.__props__, newElement.__props__);
  }

  /** @internal */
  requestUpdate(element: Component) {
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
        this.compose(newChild);
        element.__children__.push(newChild);
        nextTick(() => this.dispatch(newChild, 'mount'));
      }
    });
    element.update(element.__props__, true);
  }

  private findHostElements(element: Component): HostElement[] {
    if (!this.isComponent(element)) return [];
    return [];
  }

  private dispatch<
    M extends keyof Component,
    A extends Component[M] extends AnyFunction ? Component[M] : () => void
  >(element: Component, method: M, ...args: Parameters<A>) {
    if (!element) return;
    const fn = element[method];
    if (isFunction(fn)) fn.call(element, ...args);
    element.__children__.forEach(child => {
      if (element !== child) this.dispatch(child, method, ...args);
    });
  }

  render(element: Component, container: HostElement): Component {
    if (!this.adapter.isHostElement(container)) {
      throw new Error('Invalid host container');
    }
    if (!this.isComponent(element)) {
      throw new Error('Invalid component element');
    }
    this.compose(element);
    const hostElements = this.findHostElements(element);
    if (hostElements.some(it => !this.adapter.isHostElement(it))) {
      throw new Error('Invalid host element');
    }
    hostElements.forEach(it => this.adapter.appendElement(container, it));
    this.dispatch(element, 'mount');
    return element;
  }

  unmount(element: Component): void {
    if (!this.isComponent(element)) {
      throw new Error('Invalid component element');
    }
    const hostElements = this.findHostElements(element);
    if (hostElements.some(it => !this.adapter.isHostElement(it))) {
      throw new Error('Invalid host element');
    }
    hostElements.forEach(it => this.adapter.removeElement(it));
    this.dispatch(element, 'unmount');
  }
}