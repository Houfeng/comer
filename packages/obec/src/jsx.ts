/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

declare namespace JSX {
  type IntrinsicElements = {
    [tagName in keyof HTMLElementTagNameMap]: {
      [prop in keyof HTMLElementTagNameMap[tagName]]?: HTMLElementTagNameMap[tagName][prop];
    };
  };
}