import {
  HostAdapter,
  HostEventMap,
  HostIdleDeadline,
  HostLogger,
  HostProps,
} from "comer";
import { DOMElement, DOMHostElement } from "./DOMComponent";
import { BasicStyle, toInlineStyle } from "./DOMStyle";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

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

function isCustomAttribute(name: string) {
  return name.indexOf("data-") === 0 || name.indexOf("x-") === 0;
}

const NSMap: Record<string, string> = {
  SVG: "http://www.w3.org/2000/svg",
  MathML: "http://www.w3.org/1998/Math/MathML",
};

export class DOMAdapter implements HostAdapter<DOMHostElement, DOMElement> {
  get logger(): HostLogger {
    return console;
  }

  get isDeferSuported(): boolean {
    return true;
  }

  bind(root: DOMElement): void {
    if (!this.isHostElement(root)) return;
    if (root instanceof Text) throw new Error("Invalid host root");
    if (root.children.length > 0) throw new Error("Root is not empty");
  }

  unbind(_root: DOMElement): void {}

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
    if (isString(anchor)) {
      // At present, there is no need to handle it
    } else if (anchor && anchor !== parent) {
      // insert after anchor
      anchor.after(element);
    } else {
      // insert as first child
      parent.prepend(element);
    }
  }

  updateProps(element: DOMHostElement, props: HostProps): void {
    const target = element as Record<string, any>;
    Object.entries(props).forEach(([name, value]) => {
      if (name === "children") return;
      if (name === "style") {
        // style
        target[name] = isString(value)
          ? value
          : toInlineStyle(value as BasicStyle);
      } else if (isCustomAttribute(name)) {
        // custom attributes
        target.setAttribute(name, value);
      } else {
        // other props
        target[name] = value;
      }
    });
  }

  attachEvents(element: DOMHostElement, events: HostEventMap): void {
    Object.entries(events).forEach(([name, listener]) => {
      if (!name || !listener) return;
      const normalizedName = name.slice(2).toLowerCase();
      element.addEventListener(normalizedName, listener, false);
    });
  }

  removeEvents(element: DOMHostElement, events: HostEventMap): void {
    Object.entries(events).forEach(([name, listener]) => {
      if (!name || !listener) return;
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
    return requestIdleCallback(handler, { timeout: 5000 });
  }

  cancelIdleCallback(id: unknown): void {
    return cancelIdleCallback(id as number);
  }
}
