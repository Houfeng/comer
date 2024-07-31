/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/comer
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import * as types from '@babel/types';
import { NodePath } from '@babel/traverse';
import {
  Expression,
  JSXExpressionContainer,
  JSXSpreadAttribute,
} from '@babel/types';

type BabelTypes = typeof types;

export function plugin({ types }: { types: BabelTypes }) {
  return {
    visitor: {
      /**
       *  将 JSX 属性值转换为惰性的求值函数，为后续的可响应更新提供可能
       */
      JSXExpressionContainer(path: NodePath<JSXExpressionContainer>) {
        if (types.isLiteral(path.node.expression)) return;
        path.node.expression = types.arrowFunctionExpression(
          [],
          path.node.expression as Expression,
        );
      },

      /**
       * 将 JSX 中通过展开（... 运算符）的属性值，转换为先通过 __lazyify 函数处理
       * 处理为惰性的求值函数，为后续的可响应更新提供可能
       */
      JSXSpreadAttribute(path: NodePath<JSXSpreadAttribute>) {
        path.node.argument = types.callExpression(
          types.identifier('__lazyify'),
          [path.node.argument],
        );
      },
    },
  };
}
