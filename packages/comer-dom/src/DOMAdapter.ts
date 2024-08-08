import {
  HostAdapter,
  HostElementProps,
  HostElementEvents,
  HostIdleDeadline,
  HostLogger,
} from "comer";
import { DOMElement, DOMText } from "./DOMTypes";
import { isString } from "ntils";

const requestIdleCallback =
  window.requestIdleCallback ||
  ((handler: (deadline: IdleDeadline) => void): number => {
    const startTime = Date.now();
    return window.setTimeout(
      () =>
        handler({
          didTimeout: false,
          timeRemaining: () => Math.max(0, 50.0 - (Date.now() - startTime)),
        }),
      1,
    );
  });

const cancelIdleCallback =
  window.cancelIdleCallback || ((id) => window.clearTimeout(id));

const NSMap: Record<string, string> = {
  svg: "http://www.w3.org/2000/svg",
  math: "http://www.w3.org/1998/Math/MathML",
};

export class DOMAdapter implements HostAdapter<DOMElement> {
  get logger(): HostLogger {
    return console;
  }

  bindRoot(root: DOMElement): void {
    if (!this.isHostElement(root)) return;
    if (root instanceof DOMText) throw new Error("Invalid host root");
    if (root.children.length > 0) throw new Error("Root is not empty");
  }

  isHostElement(value: unknown): value is DOMElement {
    return (
      !!value &&
      (value instanceof HTMLElement ||
        value instanceof SVGAElement ||
        value instanceof Text)
    );
  }

  createElement(type: string): DOMElement {
    if (!type) throw new Error("Invalid host element type");
    if (type === "text_node") return document.createTextNode("");
    const [tagName, ns] = type.split(":");
    if (ns) {
      return document.createElementNS(NSMap[ns] || ns, tagName) as DOMElement;
    } else {
      return document.createElement(type);
    }
  }

  removeElement(element: DOMElement): void {
    if (!this.isHostElement(element)) return;
    if (element.remove) return element.remove();
    if (!element.parentElement) return;
    element.parentElement.removeChild(element);
  }

  insertElement(
    parent: DOMElement,
    element: DOMElement,
    anchor: DOMElement | string,
  ): void {
    if (!this.isHostElement(parent)) return;
    if (!this.isHostElement(element)) return;
    if (this.isHostElement(anchor) && anchor.nextSibling) {
      // insert after
      parent.insertBefore(anchor.nextSibling, element);
    } else if (isString(anchor)) {
      // At present, there is no need to handle it
    } else {
      // append
      parent.appendChild(element);
    }
  }

  updateProps(element: DOMElement, props: HostElementProps): void {
    if (!this.isHostElement(element)) return;
    const target = element as any;
    Object.entries(props).forEach(([name, value]) => {
      if (name === "children") return;
      if (/^(x|data)-/.test(name)) {
        // custom attributes
        target.setAttribute(name, value);
      } else {
        // props
        target[name] = value;
      }
    });
  }

  attachEvents(element: DOMElement, events: HostElementEvents): void {
    if (!this.isHostElement(element)) return;
    Object.entries(events).forEach(([name, listener]) => {
      const normalizedName = name.slice(2).toLowerCase();
      element.addEventListener(normalizedName, listener, false);
    });
  }

  removeEvents(element: DOMElement, events: HostElementEvents): void {
    if (!this.isHostElement(element)) return;
    Object.entries(events).forEach(([name, listener]) => {
      const normalizedName = name.slice(2).toLowerCase();
      element.removeEventListener(normalizedName, listener, false);
    });
  }

  requestPaintCallback(handler: (time: number) => void): unknown {
    if (typeof requestAnimationFrame === "undefined") {
      return handler(Date.now());
    }
    return requestAnimationFrame(handler);
  }

  cancelPaintCallback(id: unknown): void {
    if (typeof cancelAnimationFrame === "undefined") return;
    if (id) cancelAnimationFrame(id as number);
  }

  requestIdleCallback(handler: (deadline: HostIdleDeadline) => void): unknown {
    return requestIdleCallback(handler);
  }

  cancelIdleCallback(id: unknown): void {
    return cancelIdleCallback(id as number);
  }
}
