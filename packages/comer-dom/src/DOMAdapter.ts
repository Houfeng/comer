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

  appendElement(parentElement: DOMElement, childElement: DOMElement): void {
    if (!this.isHostElement(parentElement)) return;
    if (!this.isHostElement(childElement)) return;
    parentElement.appendChild(childElement);
  }

  replaceElement(oldElement: DOMElement, newElement: DOMElement): void {
    if (!this.isHostElement(oldElement)) return;
    if (!this.isHostElement(newElement)) return;
    const { parentElement } = oldElement;
    if (!parentElement) return;
    parentElement.insertBefore(oldElement, newElement);
    parentElement.removeChild(oldElement);
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
