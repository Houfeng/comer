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

/**
 * ComponentProps type utils
 */
type ComponentProps<P extends object, R extends object> = {
  ref?: Ref<R>;
  key?: unknown;
} & P;

/**
 * ComponentParameters type utils
 */
type ComponentParameters<P extends object, R extends object> =
  RequiredKeyOf<P> extends never
    ? OptionalKeyOf<P> extends never
      ? Parameters<() => void>
      : Parameters<(props?: ComponentProps<P, R>) => void>
    : Parameters<(props: ComponentProps<P, R>) => void>;

/**
 * Component class type
 * @internal
 */
export type ComponentType<P extends object, R extends object> = {
  new (...params: ComponentParameters<P, R>): Component<P, R>;
};

/**
 * Component abstract class, the base class for all components
 */
export abstract class Component<P extends object = {}, R extends object = {}> {
  /** @internal */
  [PROPS]: ComponentProps<P, R>;

  /** @internal */
  [CHILDREN]: Component[];

  /** @internal */
  [PARENT]?: Component;

  /** @internal */
  [EVENTS]?: Record<string, AnyFunction>;

  /** @internal */
  [REACTIVER]?: ReactiveFunction;

  constructor(...params: ComponentParameters<P, R>) {
    this[PROPS] = { ...params[0] } as ComponentProps<P, R>;
  }

  get props(): Readonly<ComponentProps<P, R>> {
    return this[PROPS];
  }

  protected use<T extends ProviderType<any>>(
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
