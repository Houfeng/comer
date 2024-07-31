import { isFunction } from 'ntils';
import { HostAdapter, HostElement } from './HostAdapter';
import { Component } from './Component';
import { AnyFunction } from './TypeUtil';
import { nextTick, observable } from 'ober';
import { HostComponent } from './HostComponent';

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

  private isSomeComponentType(el1: unknown, el2: unknown): boolean {
    return this.isComponent(el1)
      && this.isComponent(el2)
      && el1.constructor !== el2.constructor;
  }

  private isHostComponent(value: unknown):
    value is HostComponent<object, object> {
    return this.isComponent(value) && value instanceof HostComponent
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


  private build(element: Component): Component[] {
    // Make the props of the instance observable
    element.__props__ = observable(element.__props__);
    // Execute build method
    // TODO: Collect dependencies 
    const result = element.build();
    const children = result !== element ? result.__children__ : [result];
    return (children || []).flat(1);
  }

  private findParentHostComponent(element?: Component):
    HostComponent<object, object> | void {
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

  private findHostComponents(element?: Component):
    HostComponent<object, object>[] {
    if (!element) return [];
    return [];
  }

  private findHostElements(element: Component): HostElement[] {
    if (!this.isComponent(element)) return [];
    return this.findHostComponents(element).map(it => it.hostElement);
  }

  private composeToHost(element: Component, parent?: Component) {
    if (this.isHostComponent(element)) {
      element.hostElement = this.adapter.createElement(element.type);
    }
    element.__children__.forEach(child => this.composeToHost(child, element));
    const parentHostElement = this.findParentHostElement(parent);
    if (!parentHostElement) return;
    const childrenHostElements = this.findHostElements(element);
    childrenHostElements.forEach(childHostElement => {
      this.adapter.appendElement(parentHostElement, childHostElement);
    });
  }

  private compose(element: Component, parent?: Component): void {
    if (!this.isComponent(element)) return;
    element.__parent__ = parent;
    element.__children__ = this.build(element);
    element.__children__.forEach(child => this.compose(child, element));
    this.composeToHost(element);
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
        nextTick(() => this.dispatch(newChild, 'mount'));
      }
    });
    element.update(element.__props__, true);
  }

  render<T extends Component>(element: T, container: HostElement): T {
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