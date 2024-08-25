import { HostAdapter, HostElement } from "./HostAdapter";
import { Component, ComponentConstructor, useContext } from "./Component";
import { isObservable, reactivable } from "ober";
import { HostComponent } from "./HostComponent";
import { Fragment } from "./Fragment";
import {
  $Children,
  $Flush,
  $Parent,
  $Props,
  $Reactive,
  $Value,
  $Host,
  $Prev,
  $Build,
  $Mount,
  $Update,
  $Step,
} from "./Symbols";
import { Delegate } from "./Delegate";
import { Deferment } from "./Deferment";
import { Scheduler } from "./Scheduler";
import { Stepper } from "./Stepper";

function createReactiver(build: () => Component, update: () => void) {
  return reactivable(build, { update, batch: false });
}

function isEventKey(name: string) {
  return !!name && name.indexOf("on") === 0;
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
  private stepper = new Stepper();

  private getComponentConstructor(
    element: Component,
  ): ComponentConstructor<any, any> {
    return element.constructor as ComponentConstructor<any, any>;
  }

  private isComponent(value: unknown): value is Component {
    return !!value && value instanceof Component;
  }

  private isHostComponent(value: unknown): value is HostComponent {
    return !!value && value instanceof HostComponent;
  }

  private isFragment(value: unknown): value is Fragment {
    return !!value && value instanceof Fragment;
  }

  private isDelegate(value: unknown): value is Delegate {
    return !!value && value instanceof Delegate;
  }

  private getComponentType(element: Component): ComponentConstructor<any, any> {
    return this.isDelegate(element)
      ? element.Target
      : this.getComponentConstructor(element);
  }

  private isSomeComponentType(el1: unknown, el2: unknown): boolean {
    return (
      this.isComponent(el1) &&
      this.isComponent(el2) &&
      this.getComponentType(el1) === this.getComponentType(el2)
    );
  }

  private bindReactiver(element: Component): void {
    if (element[$Reactive]) return;
    if (this.isDelegate(element) || this.isFragment(element)) return;
    // Normalize the props of element
    this.normalizeProps(element);
    // unless: Make the props of the instance observable
    // unless: element[$Props] = observable(element[$Props]);
    // Bind a schedule task
    element[$Build] = () => this.buildElement(element, false);
    // Request rebuild function
    element[$Update] = (nextStep = true) => {
      if (!element[$Build]) return;
      if (nextStep) this.stepper.next();
      const willDefer = this.canDefer(element);
      const { defer, post } = this.scheduler;
      return willDefer
        ? defer(() => post(element[$Build]!))
        : post(element[$Build]);
    };
    // Create a reactiver
    element[$Reactive] = createReactiver(
      () => element["build"](),
      element[$Update],
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

  private findLastHostComponentRoot(element?: Component): Component | void {
    let current = element;
    while (current) {
      if (this.isHostComponent(current) && current[$Host]) return current;
      if (!current[$Children]) return;
      current = current[$Children][current[$Children].length - 1];
    }
  }

  private findAnchorHostComponent(element?: Component): HostComponent | void {
    let current = element;
    while (current) {
      if (!current[$Prev]) {
        current = current[$Parent];
        if (this.isHostComponent(current)) return current;
        continue;
      }
      const anchor = this.findLastHostComponentRoot(current[$Prev]);
      if (anchor) return anchor;
      current = current[$Prev];
    }
  }

  private findAnchorHostElement(element?: Component): HostElement | void {
    const hostComponent = this.findAnchorHostComponent(element);
    if (!hostComponent) return;
    const hostElement = hostComponent[$Host];
    if (hostElement) return hostElement;
    // throw new Error("The nearest prev host element has not been created");
  }

  private getHostElementType(element: Component): string | void {
    const ctor = this.getComponentConstructor(element);
    return this.isHostComponent(element) && "type" in ctor
      ? String(ctor.type)
      : void 0;
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
      if (!element[$Host]) throw new Error("Invalid host element");
      const parent = this.findParentHostElement(element);
      if (!parent) throw new Error("Parent host element not found");
      const anchor = this.findAnchorHostElement(element);
      this.adapter.insertElement(parent, element[$Host], anchor);
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
  ): void {
    if (!hostElement) return;
    if (!hostElement[$Flush]) {
      hostElement[$Flush] = {
        willUpdateProps,
        willAttachEvents,
        willRemoveEvents,
        handler: () => {
          const { willUpdateProps, willAttachEvents, willRemoveEvents } =
            hostElement[$Flush] || {};
          this.adapter.updateProps(hostElement, willUpdateProps || {});
          this.adapter.removeEvents(hostElement, willRemoveEvents || {});
          this.adapter.attachEvents(hostElement, willAttachEvents || {});
          hostElement[$Flush] = void 0;
        },
      };
    } else {
      Object.assign(hostElement[$Flush], {
        willUpdateProps,
        willAttachEvents,
        willRemoveEvents,
      });
    }
    this.scheduler.paint(hostElement[$Flush].handler);
  }

  private normalizeProps(element: Component): void {
    const ctor = this.getComponentConstructor(element);
    if (!ctor.normalizeProps) return;
    const normalizedProps = ctor.normalizeProps(element[$Props]);
    if (isObservable(element[$Props])) {
      throw new Error("Cannot normalize props of already created components");
    } else {
      element[$Props] = normalizedProps;
    }
  }

  private applyLatestProps(
    oldElement: Component,
    newElement: Component = oldElement,
  ): boolean {
    if (!this.isSomeComponentType(oldElement, newElement)) {
      throw new Error("Update with mismatched types");
    }
    // ----
    const oldProps: Record<string, any> = oldElement[$Props];
    const newProps: Record<string, any> = newElement[$Props];
    const willUpdateHostProps: Record<string, any> = {};
    const willAttachHostEvents: Record<string, any> = {};
    const willRemoveHostEvents: Record<string, any> = {};
    let changed = false;
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
        changed = true;
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
      changed = true;
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
    return changed;
  }

  private canUpdate(oldElement: Component, newElement: Component): boolean {
    if (!oldElement || !newElement) return false;
    const isSameKey = oldElement[$Props].key === newElement[$Props].key;
    return isSameKey && this.isSomeComponentType(oldElement, newElement);
  }

  private canDefer(element: Component): boolean {
    if (!element) return false;
    const { current } = this.scheduler;
    if (current === "flush") return false;
    if (current === "defer") return true;
    if (element instanceof Deferment) return !!element.value;
    return !!useContext(element, Deferment);
  }

  /**
   * Execute its own build method and return child elements
   */
  private executeElement(element: Component): Component[] {
    try {
      // When executed for the first time, bind Reactiver
      if (!element[$Reactive]) this.bindReactiver(element);
      let results: Component[];
      if (this.isDelegate(element)) {
        results = [element.build()];
      } else if (this.isFragment(element)) {
        element.build();
        results = element[$Children] || [];
      } else {
        results = [element[$Reactive]!()];
      }
      return results.reduce<Component[]>((items, it) => {
        return this.isDelegate(it) || this.isFragment(it)
          ? [...items, ...this.executeElement(it)]
          : [...items, it];
      }, []);
    } catch (err) {
      this.adapter.logger.error(err);
      return [];
    }
  }

  private requestMount(element: Component): void {
    const { defer, post, cancel } = this.scheduler;
    if (element[$Mount]) cancel(element[$Mount]);
    element[$Mount] = () => {
      this.mountElement(element);
      element[$Mount] = void 0;
    };
    const willDefer = this.canDefer(element);
    return willDefer
      ? defer(() => post(element[$Mount]!))
      : post(element[$Mount]);
  }

  /**
   * Call executeElement to retrieve child elements
   * and perform 'update or replace or append or delete'
   */
  private buildElement(element: Component, isCreate: boolean): void {
    if (!this.isComponent(element)) return;
    // Ensure that each change is executed only once
    if ((element[$Step] || 0) >= this.stepper.current) return;
    element[$Step] = this.stepper.current;
    // Besides secondary updates, mounting is usually required
    if (isCreate) this.requestMount(element);
    // handle children
    const oldChildren = element[$Children] || [];
    const newChildren = this.executeElement(element) || [];
    const effectiveItems: Component[] = [];
    const linkEffectiveItem = (item: Component) => {
      item[$Parent] = element;
      item[$Prev] = effectiveItems[effectiveItems.length - 1];
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
        // Normalize the props of new child
        this.normalizeProps(newChild);
        // apply & update
        const changed = this.applyLatestProps(oldChild, newChild);
        if (changed) oldChild[$Update]?.(false);
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
    if (!isCreate) element["onUpdated"]?.();
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
    const composedElement = this.isDelegate(element)
      ? element.build()
      : element;
    this.buildElement(composedElement, true);
    return composedElement as E;
  }

  private unmountElement(element: Component, inDeletedTree: boolean): void {
    if (!element) return;
    const { cancel, defer, post } = this.scheduler;
    cancel(element[$Mount]);
    cancel(element[$Build]);
    element[$Reactive]?.unsubscribe();
    element["onDestroy"]?.();
    if (this.isHostComponent(element)) {
      cancel(element[$Host]?.[$Flush]?.handler);
      if (!inDeletedTree) {
        inDeletedTree = true;
        defer(() =>
          post(
            () => element[$Host] && this.adapter.removeElement(element[$Host]),
          ),
        );
      }
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
    return this.scheduler.flush(handler);
  }
}
