/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { HostAdapter, HostElement } from './HostAdapter';

export type ComponentProps = Record<string, unknown>;

export class Component<T extends ComponentProps = ComponentProps> {
  protected props: T;
  protected children: ComerElement[];
  constructor(props: T, ...children: ComerElement[]) {
    this.props = { ...props };
    this.children = [...children || []];
  }
  build(): HostElement {
    throw new Error('Invalid build method');
  }
}

export type ComerElement = HostElement | Component;

export function isComponent(value: unknown): value is Component {
  return value instanceof Component;
}

export class Renderer<T extends HostAdapter<HostElement>> {
  constructor(protected adapter: T) { }

  render(element: ComerElement, container: unknown): HostElement {
    if (!this.adapter.isElement(container)) {
      throw new Error('Invalid container');
    }
    const composedElement = isComponent(element) ? element.build() : element;
    if (!this.adapter.isElement(composedElement)) {
      throw new Error('Invalid element');
    }
    this.adapter.appendChildElement(composedElement, element);
    return composedElement;
  }

  unmount(element: HostElement): void {
    return this.adapter.removeElement(element);
  }
}
