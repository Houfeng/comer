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

  appendElement(parent: DOMElement, child: DOMElement): void {
    if (!this.isHostElement(parent)) return;
    if (!this.isHostElement(child)) return;
    parent.appendChild(child);
  }

  insertElement(parent: DOMElement, index: number, child: DOMElement): void {
    const anchor = parent.children.item(index);
    if (!anchor) this.appendElement(parent, child);
    else parent.insertBefore(anchor, child);
  }

  updateElement(element: DOMElement, props: Record<string, unknown>): void {
    if (!this.isHostElement(element)) return;
    const target = element as any;
    Object.keys(props).forEach((name) => {
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
