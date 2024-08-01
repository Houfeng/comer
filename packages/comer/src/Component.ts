import { AnyFunction, Modify, OptionalKeyOf, RequiredKeyOf } from "./TypeUtil";
import { Ref } from "./Ref";
import { PROPS, CHILDREN, PARENT, EVENTS, PROVIDER, KEY } from "./Symbols";
import { type ProviderType } from "./Provider";

export type ComponentPropsBase = { ref?: Ref<Component> };
export type ComponentConstructorParameters<P> =
  RequiredKeyOf<P> extends never
    ? OptionalKeyOf<P> extends never
      ? Parameters<() => void>
      : Parameters<(props?: Modify<ComponentPropsBase, P>) => void>
    : Parameters<(props: Modify<ComponentPropsBase, P>) => void>;

/**
 * Component abstract class, the base class for all components
 */
export abstract class Component<P extends object = {}> {
  /** @internal */
  [PROPS]: Modify<ComponentPropsBase, P>;

  /** @internal */
  [CHILDREN]: Component[];

  /** @internal */
  [PARENT]?: Component;

  /** @internal */
  [EVENTS]?: Record<string, AnyFunction>;

  /** @internal */
  [KEY]?: unknown;

  constructor(...args: ComponentConstructorParameters<P>) {
    this[PROPS] = (args[0] as Modify<ComponentPropsBase, P>) || {};
  }

  protected get props(): Readonly<P> {
    return this[PROPS];
  }

  protected use<T extends ProviderType>(
    providerClass: T,
  ): InstanceType<T>["value"] | undefined {
    if (!providerClass[PROVIDER]) return;
    const parent = this[PARENT];
    if (!parent) return;
    if (parent instanceof providerClass) return parent.value;
    return parent.use(providerClass);
  }

  build(): Component {
    throw new Error("Unimplemented build method");
  }

  update?: () => void;
  mount?: () => void;
  unmount?: () => void;
}

export type ComponentType<P extends object = any> = {
  new (...args: ConstructorParameters<typeof Component<P>>): Component<P>;
};

export function func<T extends ComponentType>(ComponentClass: T) {
  return (...args: ConstructorParameters<T>): Component<T> => {
    return new ComponentClass(...args);
  };
}
