import { isFunction } from "ntils";
import { HostElementProps, HostEventListener, HostAdapter } from "./HostAdapter";

export type DOMElement = HTMLElement | SVGElement;

export class DOMAdapter implements HostAdapter<DOMElement> {
  isElement(value: unknown): value is DOMElement {
    return value && value instanceof Element;
  }

  setElementProp(element: DOMElement, name: string, value: unknown): void {
    if (!this.isElement(element)) return;
    (element as any)[name] = value;
  }

  bindElementEvent(element: DOMElement, name: string, listener: HostEventListener): void {
    if (!this.isElement(element)) return;
    element.addEventListener(name, listener, false);
  }

  unbindElementEvent(element: DOMElement, name: string, listener: HostEventListener): void {
    if (!this.isElement(element)) return;
    element.removeEventListener(name, listener, false);
  }

  createElement(type: string, props: HostElementProps, ...children: DOMElement[]): DOMElement {
    const element = document.createElement(type);
    // Set props
    Object.keys(props || {}).forEach(key => {
      const value = props[key];
      if (/^on/.test(key) && isFunction(value)) {
        const eventName = key.slice(2);
        const eventListener = value as HostEventListener;
        this.unbindElementEvent(element, eventName, eventListener);
        this.bindElementEvent(element, eventName, eventListener);
      } else {
        this.setElementProp(element, key, value);
      }
    });
    // Append children
    (children || []).forEach(child => {
      element.appendChild(child);
    });
    return element;
  }

  removeElement(element: DOMElement): void {
    if (!this.isElement(element)) return;
    if (element.remove) return element.remove();
    if (!element.parentElement) return;
    element.parentElement.removeChild(element);
  }

  appendChildElement(parent: DOMElement, child: DOMElement): void {
    if (!this.isElement(parent)) return;
    if (!this.isElement(child)) return;
    parent.appendChild(child);
  }
}
