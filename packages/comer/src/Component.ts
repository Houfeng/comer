import { AnyFunction, Modify, OptionalKeyOf, RequiredKeyOf } from "./TypeUtil";
import { Ref } from "./Ref";
import { PROPS, CHILDREN, PARENT, EVENTS, PROVIDER } from "./Symbols";
import { type Provider } from "./Provider";

type Props = { ref?: Ref<Component> };
type Args<P> =
  RequiredKeyOf<P> extends never
    ? OptionalKeyOf<P> extends never
      ? Parameters<() => void>
      : Parameters<(props?: Modify<Props, P>) => void>
    : Parameters<(props: Modify<Props, P>) => void>;

/**
 * Component abstract class, the base class for all components
 */
export abstract class Component<P extends object = {}> {
  /**  @internal */
  [PROPS]: Modify<Props, P>;

  /**  @internal */
  [CHILDREN]: Component[];

  /**  @internal */
  [PARENT]?: Component;

  /**  @internal */
  [EVENTS]?: Record<string, AnyFunction>;

  constructor(...args: Args<P>) {
    this[PROPS] = (args[0] as Modify<Props, P>) || {};
  }

  protected get props(): Readonly<P> {
    return this[PROPS];
  }

  protected use<T extends typeof Provider<any>>(
    providerClass: T,
  ): InstanceType<T>["value"] {
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

export function func<T extends typeof Component<any>>(ComponentClass: T) {
  return (...args: ConstructorParameters<T>): InstanceType<T> => {
    //@ts-ignore
    return new ComponentClass(...args);
  };
}
