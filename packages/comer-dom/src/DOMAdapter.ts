import { HostAdapter, HostElementProps, HostElementEvents } from "comer";
import { DOMElement } from "./DOMTypes";

export class DOMAdapter implements HostAdapter<DOMElement> {
  isHostElement(value: unknown): value is DOMElement {
    return !!value && value instanceof Element;
  }

  createElement(type: string): DOMElement {
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
      if (!["children"].includes(name)) target[name] = value;
    });
  }

  attachEvents(element: DOMElement, events: HostElementEvents): void {
    if (!this.isHostElement(element)) return;
    Object.entries(events).forEach(([name, listener]) => {
      element.addEventListener(name.toLowerCase(), listener, false);
    });
  }

  removeEvents(element: DOMElement, events: HostElementEvents): void {
    if (!this.isHostElement(element)) return;
    Object.entries(events).forEach(([name, listener]) => {
      element.removeEventListener(name.toLowerCase(), listener, false);
    });
  }
}
