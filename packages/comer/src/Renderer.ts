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
  $Reactive,
  $Value,
  $Host,
  $Prev,
  $Update,
  $Mount,
} from "./Symbols";
import { Delegate } from "./Delegate";
import { Deferrable } from "./Deferrable";
import { Scheduler } from "./Scheduler";

function createReactiver(build: () => Component, update: () => void) {
  return reactivable(build, { update, batch: false });
}

function isEventKey(name: string) {
  return !!name && /^on/.test(name);
}

function isReservedKey(name: string) {
  return name === "key" || name === "ref";
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

  private isEmptyFragment(value: unknown): value is Fragment {
    return this.isFragment(value) && value["props"]?.children?.length < 1;
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
    if (element[$Reactive]) return;
    // Make the props of the instance observable
    element[$Props] = observable(element[$Props]);
    // Bind a schedule task
    element[$Update] = () => this.buildElement(element, false);
    // Request rebuild function
    const requestBuild = () => {
      if (!element[$Update]) return;
      const deferrable = this.canDefer(element);
      this.scheduler.perform(element[$Update], { deferrable });
    };
    // Create a reactiver
    element[$Reactive] = createReactiver(
      () => element["build"](),
      requestBuild,
    );
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
    const hostElement = hostComponent[$Host];
    if (hostElement) return hostElement;
    throw new Error("The nearest parent host element has not been created");
  }

  private findLastLeaf(element?: Component): Component | undefined {
    let current = element;
    while (current) {
      const children = current[$Children] || [];
      const lasChild = children[children.length - 1];
      if (!lasChild) return current;
      current = lasChild;
    }
    return current;
  }

  private findPrevHostComponent(element?: Component): HostComponent | void {
    if (!element) return;
    let prev =
      this.findLastLeaf(element[$Prev]) ||
      this.findLastLeaf(element[$Parent]?.[$Prev]);
    while (prev) {
      if (this.isHostComponent(prev)) return prev;
      prev =
        this.findLastLeaf(prev[$Prev]) ||
        this.findLastLeaf(prev[$Parent]?.[$Prev]);
    }
  }

  findPrevHostElement(element?: Component): HostElement | undefined {
    const hostComponent = this.findPrevHostComponent(element);
    if (!hostComponent) return;
    const hostElement = hostComponent[$Host];
    if (hostElement) return hostElement;
    throw new Error("The nearest prev host element has not been created");
  }

  private getHostElementType(element: Component): string {
    const ctor = element.constructor;
    return String("type" in ctor ? ctor.type : void 0);
  }

  private mountElement(element: Component): void {
    if (!this.isComponent(element)) return;
    // handle host instance
    if (this.isHostComponent(element)) {
      const hostType = this.isHostComponent(element)
        ? this.getHostElementType(element)
        : void 0;
      if (hostType) element[$Host] = this.adapter.createElement(hostType);
    }
    // Apply for the first time,
    // First apply before binding, so no response is triggered
    this.applyLatestProps(element);
    // append to parent host element
    if (this.isHostComponent(element)) {
      const parentHostElement = this.findParentHostElement(element);
      if (parentHostElement && element[$Host]) {
        const prevHostElement = void 0; //this.findPrevHostElement(element);
        this.adapter.insertElement(
          parentHostElement,
          element[$Host],
          prevHostElement,
        );
      } else {
        throw new Error("Invalid host component");
      }
    }
    // Bind ref & trigger `onCreated` hook
    this.bindRef(element);
    element["onCreated"]?.();
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

  private applyLatestProps(
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
    if (oldElement !== newElement) {
      // update new props
      const allKeys = new Set([
        ...Object.keys(oldProps),
        ...Object.keys(newProps),
      ]);
      allKeys.forEach((key) => {
        // props is observable object，Can trigger updates
        // key that does not exist on newProps,
        // needs to be cleared on Old by setting null
        if (oldProps[key] === newProps[key] || isReservedKey(key)) return;
        if (isEventKey(key)) {
          willAttachHostEvents[key] = newProps[key];
          willRemoveHostEvents[key] = oldProps[key];
          oldProps[key] = newProps[key] ?? null;
        } else {
          oldProps[key] = newProps[key] ?? null;
          willUpdateHostProps[key] = oldProps[key];
        }
        // TODO: When LowProxy mode
        // The new field needs to be set to be responsive
      });
    } else {
      // force flush old props
      Object.entries(oldProps).forEach(([key, value]) => {
        if (isReservedKey(key)) return;
        if (isEventKey(key)) {
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

  /**
   * Execute its own build method and return child elements
   */
  private executeElement(element: Component): Component[] {
    try {
      // When executed for the first time, bind Reactiver
      this.bindReactiver(element);
      // execute the build wrapper
      if (this.isFragment(element)) {
        element[$Reactive]?.();
        return element[$Children] || [];
      } else {
        const result = element[$Reactive]?.();
        if (this.isEmptyFragment(result)) return [];
        return result ? [result] : [];
      }
    } catch (err) {
      this.adapter.logger.error(err);
      return [];
    }
  }

  private requestMount(element: Component) {
    if (element[$Mount]) this.scheduler.cancel(element[$Mount]);
    element[$Mount] = () => {
      this.mountElement(element);
      element[$Mount] = void 0;
    };
    const deferrable = this.canDefer(element);
    this.scheduler.perform(element[$Mount], { deferrable });
  }

  /**
   * Call executeElement to retrieve child elements
   * and perform 'update or replace or append or delete'
   */
  private buildElement(element: Component, mount: boolean): void {
    if (!this.isComponent(element)) return;
    // Besides secondary updates, mounting is usually required
    if (mount) this.requestMount(element);
    // handle children
    const oldChildren = element[$Children] || [];
    const newChildren = this.executeElement(element) || [];
    const effectiveItems: Component[] = [];
    const linkEffectiveItem = (item: Component) => {
      item[$Parent] = element;
      const prevIndex = effectiveItems.length - 1;
      item[$Prev] = effectiveItems[prevIndex];
      // this.adapter.logger.info("item[$Prev]", { item, prevItem: item[$Prev] });
      effectiveItems.push(item);
    };
    const length = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < length; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];
      // TODO: Optimize KEY based reuse
      if (this.canUpdate(oldChild, newChild)) {
        // update
        linkEffectiveItem(oldChild);
        this.applyLatestProps(oldChild, newChild);
      } else if (oldChild && !newChild) {
        // remove
        this.unmount(oldChild);
      } else if (!oldChild && newChild) {
        // insert
        linkEffectiveItem(newChild);
        this.buildElement(newChild, true);
      } else if (oldChild && newChild) {
        // replace
        this.unmount(oldChild);
        linkEffectiveItem(newChild);
        this.buildElement(newChild, true);
      } else {
        throw new Error("Build element error");
      }
    }
    element[$Children] = effectiveItems;
    element["onUpdated"]?.();
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
    this.buildElement(element, true);
    return element;
  }

  private unmountElement(element: Component, inDeletedTree: boolean): void {
    if (!element) return;
    if (element[$Update]) this.scheduler.cancel(element[$Update]);
    if (element[$Mount]) this.scheduler.cancel(element[$Mount]);
    element[$Reactive]?.unsubscribe();
    element["onDestroy"]?.();
    if (this.isHostComponent(element) && !inDeletedTree) {
      inDeletedTree = true;
      this.scheduler.perform(
        () => element[$Host] && this.adapter.removeElement(element[$Host]),
        { deferrable: true },
      );
    }
    // broadcast to children
    if (!element[$Children]) return;
    element[$Children].forEach((child) =>
      this.unmountElement(child, inDeletedTree),
    );
  }

  /**
   * Unmount and destroy component subtree
   * @param element Element (Subtree root)
   * @returns
   */
  unmount(element: Component): void {
    this.unmountElement(element, false);
  }

  /**
   * Synchronize triggering component updates,
   * please use with caution as it may cause lag.
   */
  flushSync<H extends () => any>(handler: H): ReturnType<H> {
    return this.scheduler.flushSync(handler);
  }
}
