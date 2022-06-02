/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import * as types from "@babel/types";

import { Expression, JSXExpressionContainer } from "@babel/types";

import { NodePath } from "@babel/traverse";

export function plugin({ types: t }: { types: typeof types }) {
  return {
    visitor: {
      JSXExpressionContainer(path: NodePath<JSXExpressionContainer>) {
        path.node.expression = t.arrowFunctionExpression(
          [],
          path.node.expression as Expression
        );
      },
    },
  };
}
