import { HostAdapter, HostElementProps, HostElementEvents } from "comer";
import { DOMElement, DOMText } from "./DOMTypes";
import { isString } from "ntils";

export class DOMAdapter implements HostAdapter<DOMElement> {
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
    if (type === "text_node") return document.createTextNode("");
    return document.createElement(type);
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

  requestHostCallback(handler: (time: number) => void): unknown {
    if (typeof requestAnimationFrame === "undefined") {
      return handler(Date.now());
    }
    return requestAnimationFrame(handler);
  }

  cancelHostCallback(id: unknown): void {
    if (typeof cancelAnimationFrame === "undefined") return;
    if (id) cancelAnimationFrame(id as number);
  }
}
