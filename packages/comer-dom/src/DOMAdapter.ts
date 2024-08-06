import { HostAdapter, HostElementProps, HostElementEvents } from "comer";
import { DOMElement } from "./DOMTypes";

export class DOMAdapter implements HostAdapter<DOMElement> {
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

  appendElement(element: DOMElement, parent: DOMElement): void {
    if (!this.isHostElement(parent)) return;
    if (!this.isHostElement(element)) return;
    parent.appendChild(element);
  }

  insertElement(element: DOMElement, anchor: DOMElement): void {
    if (!this.isHostElement(element)) return;
    if (!this.isHostElement(anchor)) return;
    const { parentElement } = element;
    if (!parentElement) return;
    parentElement.insertBefore(anchor, element);
    parentElement.removeChild(element);
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

  requestPaintFrame(handler: (time: number) => void): unknown {
    if (typeof requestAnimationFrame === "undefined") {
      return handler(Date.now());
    }
    return requestAnimationFrame(handler);
  }

  cancelPaintFrame(id: unknown): void {
    if (typeof cancelAnimationFrame === "undefined") return;
    if (id) cancelAnimationFrame(id as number);
  }
}
