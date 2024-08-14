import {
  HostAdapter,
  HostEventMap,
  HostIdleDeadline,
  HostLogger,
  HostProps,
} from "comer";
import { DOMElement, DOMHostElement } from "./DOMComponent";
import { isString } from "ntils";
import { BasicStyle, toInlineStyle } from "./DOMStyle";

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
  SVG: "http://www.w3.org/2000/svg",
  MathML: "http://www.w3.org/1998/Math/MathML",
};

export class DOMAdapter implements HostAdapter<DOMHostElement, DOMElement> {
  get logger(): HostLogger {
    return console;
  }

  bindRoot(root: DOMElement): void {
    if (!this.isHostElement(root)) return;
    if (root instanceof Text) throw new Error("Invalid host root");
    if (root.children.length > 0) throw new Error("Root is not empty");
  }

  isHostElement(value: unknown): value is DOMHostElement {
    return (
      !!value &&
      (value instanceof HTMLElement ||
        value instanceof SVGAElement ||
        value instanceof MathMLElement ||
        value instanceof Text)
    );
  }

  createElement(type: string): DOMHostElement {
    if (!type) throw new Error("Invalid host element type");
    if (type === "text") return document.createTextNode("");
    if (type.includes(":")) {
      const [ns, tag] = type.split(":");
      return document.createElementNS(NSMap[ns] || ns, tag) as DOMHostElement;
    } else {
      return document.createElement(type);
    }
  }

  removeElement(element: DOMHostElement): void {
    if (!this.isHostElement(element)) return;
    element.remove();
  }

  insertElement(
    parent: DOMHostElement,
    element: DOMHostElement,
    anchor: DOMHostElement | string,
  ): void {
    if (parent instanceof Text) return;
    if (!this.isHostElement(parent)) return;
    if (!this.isHostElement(element)) return;
    if (this.isHostElement(anchor)) {
      // insert after anchor
      anchor.after(element);
    } else if (isString(anchor)) {
      // At present, there is no need to handle it
    } else {
      // append
      parent.prepend(element);
    }
  }

  updateProps(element: DOMHostElement, props: HostProps): void {
    if (!this.isHostElement(element)) return;
    const target = element as Record<string, any>;
    Object.entries(props).forEach(([name, value]) => {
      if (name === "children") return;
      if (/^(x|data)-/.test(name)) {
        // custom attributes
        target.setAttribute(name, value);
      } else if (name === "style") {
        // style
        target[name] = isString(value)
          ? value
          : toInlineStyle(value as BasicStyle);
      } else {
        // other props
        target[name] = value;
      }
    });
  }

  attachEvents(element: DOMHostElement, events: HostEventMap): void {
    if (!this.isHostElement(element)) return;
    Object.entries(events).forEach(([name, listener]) => {
      if (!name || !listener) return;
      const normalizedName = name.slice(2).toLowerCase();
      element.addEventListener(normalizedName, listener, false);
    });
  }

  removeEvents(element: DOMHostElement, events: HostEventMap): void {
    if (!this.isHostElement(element)) return;
    Object.entries(events).forEach(([name, listener]) => {
      if (!name || !listener) return;
      const normalizedName = name.slice(2).toLowerCase();
      element.removeEventListener(normalizedName, listener, false);
    });
  }

  requestPaintCallback(handler: (time: number) => void): unknown {
    if (!handler) return;
    if (typeof requestAnimationFrame === "undefined") {
      return handler(Date.now());
    }
    return requestAnimationFrame(handler);
  }

  cancelPaintCallback(id: unknown): void {
    if (!id) return;
    if (typeof cancelAnimationFrame === "undefined") return;
    if (id) cancelAnimationFrame(id as number);
  }

  requestIdleCallback(handler: (deadline: HostIdleDeadline) => void): unknown {
    if (!handler) return;
    return requestIdleCallback(handler);
  }

  cancelIdleCallback(id: unknown): void {
    if (!id) return;
    return cancelIdleCallback(id as number);
  }
}
