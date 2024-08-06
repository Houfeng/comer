import { OptionalKeyOf, RequiredKeyOf } from "./TypeUtil";
import { Ref } from "./Ref";
import { PROPS, CHILDREN, PARENT, IDENTIFY, REACTIVER } from "./Symbols";
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
 * @abstract
 * @class
 */
export abstract class Component<P extends object = {}, R extends object = {}> {
  /** @internal */
  [PROPS]: ComponentProps<P, R>;

  /** @internal */
  [CHILDREN]?: Component[];

  /** @internal */
  [PARENT]?: Component;

  /** @internal */
  [REACTIVER]?: ReactiveFunction;

  constructor(...params: ComponentParameters<P, R>) {
    this[PROPS] = (params[0] || {}) as ComponentProps<P, R>;
  }

  /**
   * Component properties are read-only objects.
   * When the properties change, the component will re execute the build
   * and render according to the situation
   * @readonly
   */
  get props(): Readonly<ComponentProps<P, R>> {
    return this[PROPS];
  }

  /**
   * Retrieve the rendering context value of the specified type
   * @param providerClass Provider class that provides context value
   * @returns context value (readonly)
   */
  use<T extends ProviderType<any>>(
    providerClass: T,
  ): Readonly<InstanceType<T>["value"]> | void {
    if (providerClass[IDENTIFY] !== "Provider") return;
    let target = this[PARENT];
    while (target) {
      if (target instanceof providerClass) return target.value;
      target = target[PARENT];
    }
  }

  /**
   * Generate component rendering content, do not include time-consuming logic,
   * cannot be asynchronous, and must return component elements
   * @returns Component element (subtree root)
   * @virtual
   */
  build(): Component {
    throw new Error("Unimplemented build method");
  }

  /**
   * Component lifecycle hook method
   * Triggered when a component is updated
   * @callback
   * @method
   */
  update?: () => void;

  /**
   * Component lifecycle hook method
   * Triggered when component creation is completed and available
   * @callback
   * @method
   */
  mount?: () => void;

  /**
   * Component lifecycle hook method
   * Triggered during component destruction
   * @callback
   * @method
   */
  unmount?: () => void;
}
