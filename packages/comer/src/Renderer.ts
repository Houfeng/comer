import { HostAdapter, HostElement } from "./HostAdapter";
import { Component, ComponentConstructor, useContext } from "./Component";
import { reactivable } from "ober";
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
  $ChildKMap,
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

type NblComponent = Component | undefined | null;
type NblComponentArray = Array<NblComponent>;
type NblComponentMap = Record<string, NblComponent>;

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

  private isComponent(value: unknown): value is Component {
    return !!value && value instanceof Component;
  }

  private isHostComponent(value: unknown): value is HostComponent {
    return !!value && value instanceof HostComponent;
  }

  private getComponentConstructor(
    element: Component,
  ): ComponentConstructor<any, any> {
    return element.constructor as ComponentConstructor<any, any>;
  }

  private isFragment(element: Component): element is Fragment {
    return !!element && this.getComponentConstructor(element) === Fragment;
  }

  private isDelegate(element: Component): element is Delegate {
    return (
      !!element &&
      (this.getComponentConstructor(element) as unknown) === Delegate
    );
  }

  private getComponentType(element: Component): ComponentConstructor<any, any> {
    return this.isDelegate(element)
      ? element.Target
      : this.getComponentConstructor(element);
  }

  private isSameComponentType(el1: Component, el2: Component): boolean {
    return this.getComponentType(el1) === this.getComponentType(el2);
  }

  private bindReactiver(element: Component): void {
    if (element[$Reactive]) return;
    if (this.isDelegate(element) || this.isFragment(element)) return;
    // Normalize the props of element
    this.normalizeProps(element);
    this.hideReservedProps(element);
    // uneless: Make the props of the instance observable
    // uneless: element[$Props] = observable(element[$Props]);
    // Bind a schedule task
    element[$Build] = () => this.buildElement(element, false);
    // Request rebuild function
    element[$Update] = (nextStep = true) => {
      if (!element[$Build]) return;
      if (nextStep) this.stepper.next();
      // Ensure that each change is executed only once
      if ((element[$Step] ?? -1) >= this.stepper.current) return;
      element[$Step] = this.stepper.current;
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
    // if (ref[$Value]) throw new Error("Ref cannot be repeatedly bound");
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
    element[$Props] = ctor.normalizeProps(element[$Props]);
    // useless:
    // if (isObservable(element[$Props])) {
    //   throw new Error("Cannot normalize props of already created components");
    // } else {
    //   element[$Props] = ctor.normalizeProps(element[$Props]);;
    // }
  }

  private hideReservedProps(element: Component) {
    const props = element[$Props];
    Object.defineProperties(props, {
      key: { enumerable: false, value: props.key },
      ref: { enumerable: false, value: props.ref },
    });
  }

  private applyLatestProps(
    oldElement: Component,
    newElement: Component = oldElement,
  ): boolean {
    if (!this.isSameComponentType(oldElement, newElement)) {
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
    return isSameKey && this.isSameComponentType(oldElement, newElement);
  }

  private canDefer(element: Component): boolean {
    if (!element) return false;
    const { current } = this.scheduler;
    if (current === "flush") return false;
    if (current === "defer") return true;
    if (element instanceof Deferment) return !!element.value;
    return !!useContext(element, Deferment);
  }

  private composeFragment(fragment: Fragment): Component[] {
    fragment.build();
    return fragment[$Children] || [];
  }

  /**
   * Execute its own build method and return child elements
   */
  private composeElement(element: Component): Component[] {
    try {
      if (this.isFragment(element)) return this.composeFragment(element);
      // When executed for the first time, bind Reactiver
      if (!element[$Reactive]) this.bindReactiver(element);
      const result = element[$Reactive]?.();
      if (!result) return [];
      return this.isFragment(result) ? this.composeFragment(result) : [result];
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

  private getRawElement(element: Component) {
    return this.isDelegate(element) ? element.build() : element;
  }

  /**
   * Call executeElement to retrieve child elements
   * and perform 'update or replace or append or delete'
   */
  private buildElement(element: Component, isMount: boolean): void {
    if (!this.isComponent(element)) return;
    // Besides secondary updates, mounting is usually required
    if (isMount) this.requestMount(element);
    // handle children
    const oldChildren: NblComponentArray = element[$Children] || [];
    const newChildren: NblComponentArray = this.composeElement(element) || [];
    const children: Component[] = [];
    const oldChildKMap: NblComponentMap = element[$ChildKMap] || {};
    const childKMap: Record<string, Component> = {};
    const linkChild = (item: Component) => {
      item[$Parent] = element;
      item[$Prev] = children[children.length - 1];
      children.push(item);
      const { key } = item[$Props];
      if (key) childKMap[key] = item;
    };
    const length = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < length; i++) {
      const newChild = newChildren[i];
      const key = newChild?.[$Props].key ?? "";
      const oldChild = oldChildKMap[key] ?? oldChildren[i];
      if (oldChild && newChild && this.canUpdate(oldChild, newChild)) {
        // update
        linkChild(oldChild);
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
        const target = this.getRawElement(newChild);
        linkChild(target);
        this.buildElement(target, true);
      } else if (oldChild && newChild) {
        // replace
        this.unmount(oldChild);
        const target = this.getRawElement(newChild);
        linkChild(target);
        this.buildElement(target, true);
      } else {
        throw new Error("Build element error");
      }
    }
    element[$Children] = children;
    element[$ChildKMap] = childKMap;
    if (!isMount) element["onUpdated"]?.();
  }

  private root?: Parameters<T["bind"]>[0];

  /**
   * Render and mount the component tree of the application to the root
   * @param element Element
   * @param root Mount root（HostElement or other supported Host object）
   * @returns
   */
  render<E extends Component>(element: E, root: Parameters<T["bind"]>[0]): E {
    this.checkDestroyState();
    if (!this.adapter.isHostElement(root)) {
      throw new Error("Invalid host root");
    }
    this.root = root;
    this.adapter.bind(root);
    this.stepper.bind();
    const target = this.getRawElement(element);
    this.buildElement(target, true);
    return target as E;
  }

  private unmountElement(element: Component, inDeletedTree: boolean): void {
    if (!element) return;
    const { cancel, defer, post } = this.scheduler;
    cancel(element[$Mount]);
    cancel(element[$Build]);
    element[$Reactive]?.unsubscribe();
    element["onDestroy"]?.();
    if (this.isHostComponent(element)) {
      const host = element[$Host];
      cancel(host?.[$Flush]?.handler);
      if (!inDeletedTree) {
        inDeletedTree = true;
        defer(() => post(() => host && this.adapter.removeElement(host)));
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
    this.checkDestroyState();
    this.unmountElement(element, false);
  }

  /**
   * Synchronize triggering component updates,
   * please use with caution as it may cause lag.
   */
  flushSync<H extends () => any>(handler: H): ReturnType<H> {
    this.checkDestroyState();
    return this.scheduler.flush(handler);
  }

  private _destroyed = false;

  private checkDestroyState() {
    if (this._destroyed) throw new Error("Renderer is destroyed");
  }

  /**
   * Check if the current instance has been destroyed
   */
  public get destroyed() {
    return this._destroyed;
  }

  /**
   * Destroy the renderer instance
   */
  destroy() {
    this.checkDestroyState();
    this.stepper.unbind();
    if (this.root) this.adapter.unbind?.(this.root);
    this._destroyed = true;
  }
}
