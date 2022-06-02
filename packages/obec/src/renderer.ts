/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { isArray, isFunction } from "ntils";

export type AnyFunction = (...args: any) => any;
export type ComponentElement = Element;
export type ComponentNode = Node | string | number | AnyFunction | unknown;

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
  const { children, ...others } = props || {};
  const element = document.createElement(type);
  setProps(element, others);
  appendChildren(element, isArray(children) ? children : [children]);
  return element;
}

export function render(node: ComponentNode, container: Element): void {
  container.appendChild(normalizeNode(node));
}