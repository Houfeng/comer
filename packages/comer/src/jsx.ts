/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

/* eslint-disable */

type AnyFunction = (...args: any) => any;

declare namespace JSX {
  type IntrinsicNode = Node;
  type IntrinsicElement = Element & EventTarget;
  type ComposeNode = IntrinsicNode | string | number | AnyFunction;

  type IntrinsicElements = {
    [tagName in keyof HTMLElementTagNameMap]: {
      [prop in keyof HTMLElementTagNameMap[tagName]]?: Partial<
        HTMLElementTagNameMap[tagName][prop]
      >;
    };
  };

  type Element = ComposeNode | ComposeNode[];
}

/* eslint-enable */
