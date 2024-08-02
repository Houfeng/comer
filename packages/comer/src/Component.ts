import { AnyFunction, OptionalKeyOf, RequiredKeyOf } from "./TypeUtil";
import { Ref } from "./Ref";
import {
  PROPS,
  CHILDREN,
  PARENT,
  EVENTS,
  IDENTIFY,
  REACTIVER,
} from "./Symbols";
import { type ProviderType } from "./Provider";
import { ReactiveFunction } from "ober";

export type ComponentProps<P extends object> = {
  ref?: Ref<Component<P>>;
  key?: unknown;
} & P;

export type ComponentParameters<P extends object> =
  RequiredKeyOf<P> extends never
    ? OptionalKeyOf<P> extends never
      ? Parameters<() => void>
      : Parameters<(props?: ComponentProps<P>) => void>
    : Parameters<(props: ComponentProps<P>) => void>;

export type ComponentType<P extends object = any> = {
  new (...params: ComponentParameters<P>): Component<P>;
};

/**
 * Component abstract class, the base class for all components
 */
export abstract class Component<P extends object = any> {
  /** @internal */
  [PROPS]: ComponentProps<P>;

  /** @internal */
  [CHILDREN]: Component[];

  /** @internal */
  [PARENT]?: Component;

  /** @internal */
  [EVENTS]?: Record<string, AnyFunction>;

  /** @internal */
  [REACTIVER]?: ReactiveFunction;

  constructor(...params: ComponentParameters<P>) {
    this[PROPS] = { ...params[0] } as ComponentProps<P>;
  }

  protected get props(): Readonly<ComponentProps<P>> {
    return this[PROPS];
  }

  protected use<T extends ProviderType>(
    providerClass: T,
  ): InstanceType<T>["value"] | void {
    if (providerClass[IDENTIFY] !== "Provider") return;
    let target = this[PARENT];
    while (target) {
      if (target instanceof providerClass) return target.value;
      target = target[PARENT];
    }
  }

  build(): Component {
    throw new Error("Unimplemented build method");
  }

  update?: () => void;
  mount?: () => void;
  unmount?: () => void;
}

export function func<T extends ComponentType>(ComponentClass: T) {
  return (...args: ConstructorParameters<T>): Component<T> => {
    return new ComponentClass(...args);
  };
}
