/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { isArray, isFunction } from "ntils";

export type AnyFunction = (...args: any) => any;
export type ComponentElement = Element;
export type ComponentNode = Node | string | number | AnyFunction;

export type ComponentProps = Record<string, any> & {
  children?: ComponentNode | ComponentNode[];
};

export type Component<P extends ComponentProps> = (props: P) => ComponentNode;

function isNode(value: ComponentNode): value is Node {
  return value instanceof Node;
}

function isEventProp(key: string) {
  return key && key.startsWith("on");
}

function normalizeNode(node: ComponentNode) {
  if (isNode(node)) return node;
  return document.createTextNode(String(node ?? ""));
}

function setProps(element: ComponentElement, props: ComponentProps) {
  if (!element || !props) return;
  Object.entries(props || {}).forEach(([key, value]) => {
    value = isFunction(value) ? value() : value;
    if (isEventProp(key)) {
      element.addEventListener(key.slice(2), value);
    } else {
      // @ts-ignore
      element[key] = value;
    }
  });
}

function setStyle(
  element: ComponentElement,
  style: Partial<CSSStyleDeclaration>
) {
  style = isFunction(style) ? style() : style;
  if (!element || !style) return;
  if (element instanceof HTMLElement || element instanceof SVGElement) {
    Object.entries(style || {}).forEach(([key, value]) => {
      //@ts-ignore
      element.style[key] = String(value);
    });
  }
}

function appendChildren(parent: ComponentElement, children: ComponentNode[]) {
  if (!(parent instanceof Node)) return;
  children.forEach((child) => {
    child = isFunction(child) ? child() : child;
    if (isArray(child)) {
      appendChildren(parent, child);
    } else {
      parent.appendChild(normalizeNode(child));
    }
  });
}

export function createElement(
  type: string | Component<any>,
  props: ComponentProps = {}
): ComponentNode {
  if (isFunction(type)) return type(props);
  const { children, style, ...others } = props || {};
  const element = document.createElement(type);
  setProps(element, others);
  setStyle(element, style);
  appendChildren(element, isArray(children) ? children : [children]);
  return element;
}

export function render(node: ComponentNode, container: Element): Node {
  return container.appendChild(normalizeNode(node));
}