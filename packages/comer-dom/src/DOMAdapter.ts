import { HostEventListener, HostAdapter } from "comer";
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

  updateElement(element: DOMElement, props: Record<string, unknown>): void {
    if (!this.isHostElement(element)) return;
    const target = element as any;
    Object.keys(props).forEach((name) => {
      if (["children"].includes(name)) return;
      target[name] = props[name];
    });
  }

  attachEvent(
    element: DOMElement,
    name: string,
    listener: HostEventListener,
  ): void {
    if (!this.isHostElement(element)) return;
    element.addEventListener(name, listener, false);
  }

  removeEvent(
    element: DOMElement,
    name: string,
    listener: HostEventListener,
  ): void {
    if (!this.isHostElement(element)) return;
    element.removeEventListener(name, listener, false);
  }
}
