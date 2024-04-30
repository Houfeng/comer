/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { isArray, isFunction } from 'ntils';

export type ComponentProps = Record<string, unknown> & {
  children?: JSX.Element;
};

export type Component<P extends ComponentProps = ComponentProps> = (
  props: P
) => JSX.IntrinsicNode;

function isIntrinsicNode(value: unknown): value is JSX.IntrinsicNode {
  return value instanceof Node;
}

function isIntrinsicElement(value: unknown): value is JSX.IntrinsicElement {
  return value instanceof Element;
}

function isEventName(key: string) {
  return key && key.startsWith('on');
}

function toIntrinsicNode(node: JSX.ComposeNode) {
  if (isIntrinsicNode(node)) return node;
  return document.createTextNode(String(node ?? ''));
}

function setIntrinsicProps(
  element: JSX.IntrinsicElement,
  props: ComponentProps,
) {
  if (!element || !props) return;
  Object.entries(props || {}).forEach(([key, value]) => {
    value = isFunction(value) ? value() : value;
    if (isEventName(key) && isFunction(value)) {
      element.addEventListener(key.slice(2), value as EventListener, false);
    } else {
      // @ts-expect-error xxx
      element[key] = value;
    }
  });
}

function setIntrinsicStyle(
  element: JSX.IntrinsicElement,
  style: Partial<CSSStyleDeclaration>,
) {
  style = isFunction(style) ? style() : style;
  if (!element || !style || !isIntrinsicElement(element)) return;
  Object.entries(style || {}).forEach(([key, value]) => {
    //@ts-expect-error xxx
    element.style[key] = String(value);
  });
}

function appendIntrinsicChildren(
  parent: JSX.IntrinsicElement,
  children: JSX.Element,
): JSX.IntrinsicNode[] {
  if (!isIntrinsicNode(parent) || !children) return;
  children = isArray(children) ? children : [children];
  children.forEach((child) => {
    child = isFunction(child) ? child() : child;
    if (isArray(child)) {
      appendIntrinsicChildren(parent, child);
    } else {
      parent.appendChild(toIntrinsicNode(child));
    }
  });
  return [].slice.call(parent.childNodes);
}

function unwrapProps(props: ComponentProps = {}) {
  const unwrappedProps: ComponentProps = {};
  Object.entries(props || {}).forEach(([key, value]) => {
    value = isFunction(value) ? value() : value;
    unwrappedProps[key] = value;
  });
  return unwrappedProps;
}

export function createElement(
  type: string | Component,
  props: ComponentProps = {},
): JSX.IntrinsicNode {
  if (isFunction(type)) {
    return toIntrinsicNode(type(unwrapProps(props)));
  }
  const { children, style, ...others } = props || {};
  const element = document.createElement(type);
  setIntrinsicProps(element, others);
  setIntrinsicStyle(element, style as Partial<CSSStyleDeclaration>);
  appendIntrinsicChildren(element, children);
  return element;
}

export function mount(
  node: JSX.Element,
  container: JSX.IntrinsicElement,
): JSX.IntrinsicNode[] {
  return appendIntrinsicChildren(container, node);
}

export function unmount(node: JSX.IntrinsicNode | JSX.IntrinsicNode[]) {
  const nodes = isArray(node) ? node : [node];
  nodes.slice(0).forEach((it) => {
    if (it.parentNode) it.parentNode.removeChild(it);
  });
}

export const render = mount;
