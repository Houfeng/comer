import { type Component, type ComponentConstructor } from "./Component";

/**
 * Create a factory function that can generate component instances
 * through component classes
 * @param ComponentClass Component class
 * @returns Factory function
 * @function
 */
export function factory<T extends ComponentConstructor<any, any>>(
  ComponentClass: T,
) {
  return (...args: ConstructorParameters<T>): Component<T> => {
    return new ComponentClass(...args);
  };
}
