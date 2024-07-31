import { isFunction } from 'ntils';
import { HostAdapter, HostElement, HostElementProps, HostEventListener } from './HostAdapter';
import { Component } from './Component';
import { AnyFunction } from './TypeUtil';

/**
 * Comer renderer, rendering elements to the host surface
 */
export class Renderer<T extends HostAdapter<HostElement>> {
  /**
   * Create a comer renderer instance using the specified adapter
   * @param adapter Host adapter (eg. DOMAdapter)
   */
  constructor(protected adapter: T) { }

  /** @internal */
  isComponent(value: unknown): value is Component {
    return value && value instanceof Component;
  }

  /** @internal */
  createElement(
    type: string,
    props: HostElementProps,
    ...children: HostElement[]
  ) {
    const element = this.adapter.createElement(type)
    // Set props
    Object.keys(props || {}).forEach(key => {
      const value = props[key];
      if (/^on/.test(key) && isFunction(value)) {
        const eventName = key.slice(2);
        const eventListener = value as HostEventListener;
        this.adapter.removeEvent(element, eventName, eventListener);
        this.adapter.attachEvent(element, eventName, eventListener);
      } else {
        this.adapter.updateElement(element, { [key]: value });
      }
    });
    // Append children
    children?.forEach(child => this.adapter.appendElement(element, child));
  }

  /** @internal */
  build(element: Component, deep = true): void {
    if (!this.isComponent(element)) return;
    const result = element.build();
    const children = result !== element ? result.__children__ : result;
    element.__children__ = [].concat(children);
    if (!deep) return;
    element.__children__.forEach(child => this.build(child, deep));
  }

  /** @internal */
  update(oldElement: Component, newElement: Component): void {
    if (oldElement === newElement) return;
    if (oldElement.constructor !== newElement.constructor) {
      throw new Error('Update with mismatched types');
    }
    Object.assign(oldElement.__props__, newElement.__props__);
  }

  /** @internal */
  private findHostElements(element: Component): HostElement[] {
    if (!this.isComponent(element)) return [];
    return [];
  }

  /** @internal */
  private dispatch<
    M extends keyof Component,
    A extends Component[M] extends AnyFunction ? Component[M] : never
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
    this.build(element, true);
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