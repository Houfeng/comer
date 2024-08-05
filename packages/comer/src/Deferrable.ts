import { ComponentType } from "./Component";
import { DEFERRABLE } from "./Symbols";

function markDeferrable<T extends ComponentType<any, any>>(
  Component: T,
  value: boolean,
) {
  Object.defineProperty(Component, DEFERRABLE, { value });
  return Component;
}

export function deferrable<T extends ComponentType<any, any>>(Component: T): T;
export function deferrable<T extends ComponentType<any, any>>(
  value: boolean,
): (Component: T) => T;
export function deferrable<T extends ComponentType<any, any>>(
  valueOrComponent: boolean | T,
): ((Component: T) => T) | T {
  if (typeof valueOrComponent === "boolean") {
    return (Component: T) => markDeferrable(Component, valueOrComponent);
  } else {
    return markDeferrable(valueOrComponent, true);
  }
}
