/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { isArray, isFunction } from "ntils";

export type ComponentProps = Record<string, any> & {
  children?: JSX.Element;
};

export type Component<P extends ComponentProps = {}> =
  (props: P) => JSX.IntrinsicNode;

function isDOMNode(value: any): value is JSX.IntrinsicNode {
  return value instanceof Node;
}

function isDOMElement(value: any): value is JSX.IntrinsicElement {
  return value instanceof Element;
}

function isEventName(key: string) {
  return key && key.startsWith("on");
}

function toDOMNode(node: JSX.ComposeNode) {
  if (isDOMNode(node)) return node;
  return document.createTextNode(String(node ?? ""));
}

function setDOMProps(element: JSX.IntrinsicElement, props: ComponentProps) {
  if (!element || !props) return;
  Object.entries(props || {}).forEach(([key, value]) => {
    value = isFunction(value) ? value() : value;
    if (isEventName(key)) {
      element.addEventListener(key.slice(2), value);
    } else {
      // @ts-ignore
      element[key] = value;
    }
  });
}

function setDOMStyle(
  element: JSX.IntrinsicElement,
  style: Partial<CSSStyleDeclaration>
) {
  style = isFunction(style) ? style() : style;
  if (!element || !style || !isDOMElement(element)) return;
  Object.entries(style || {}).forEach(([key, value]) => {
    //@ts-ignore
    element.style[key] = String(value);
  });
}

function appendDOMChildren(
  parent: JSX.IntrinsicElement,
  children: JSX.Element
): JSX.IntrinsicNode[] {
  if (!isDOMNode(parent) || !children) return;
  children = isArray(children) ? children : [children]
  children.forEach((child) => {
    child = isFunction(child) ? child() : child;
    if (isArray(child)) {
      appendDOMChildren(parent, child);
    } else {
      parent.appendChild(toDOMNode(child));
    }
  });
  return [].slice.call(parent.childNodes);
}

function unwrapProps(props: ComponentProps = {}) {
  const unwrappedProps: ComponentProps = {}
  Object.entries(props || {}).forEach(([key, value]) => {
    value = isFunction(value) ? value() : value;
    unwrappedProps[key] = value;
  });
  return unwrappedProps;
}

export function createElement(
  type: string | Component<any>,
  props: ComponentProps = {}
): JSX.IntrinsicNode {
  if (isFunction(type)) {
    return toDOMNode(type(unwrapProps(props)));
  }
  const { children, style, ...others } = props || {};
  const element = document.createElement(type);
  setDOMProps(element, others);
  setDOMStyle(element, style);
  appendDOMChildren(element, children);
  return element;
}

export function render(
  node: JSX.Element,
  container: JSX.IntrinsicElement
): JSX.IntrinsicNode[] {
  return appendDOMChildren(container, node);
}