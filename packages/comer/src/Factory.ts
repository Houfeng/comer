import { Component, ComponentType } from "./Component";

export function factory<T extends ComponentType<any, any>>(ComponentClass: T) {
  return (...args: ConstructorParameters<T>): Component<T> => {
    return new ComponentClass(...args);
  };
}
