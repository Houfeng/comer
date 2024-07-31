import { Modify, OptionalKeyOf, RequiredKeyOf } from "./TypeUtil";
import { Ref } from "./Ref";

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
  __props__: P;

  /**  @internal */
  __children__: Component[];

  /**  @internal */
  __parent__?: Component;

  constructor(...args: Args<P>) {
    this.__props__ = (args[0] as P) || {};
  }

  protected get props(): Readonly<P> {
    return this.__props__;
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
