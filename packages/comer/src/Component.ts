import { OptionalKeyOf, RequiredKeyOf } from "./TypeUtil";
import { Ref } from "./Ref";
import { $Props, $Children, $Parent, $Identify, $Reactiver } from "./Symbols";
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
  [$Props]: ComponentProps<P, R>;

  /** @internal */
  [$Children]?: Component[];

  /** @internal */
  [$Parent]?: Component;

  /** @internal */
  [$Reactiver]?: ReactiveFunction;

  constructor(...params: ComponentParameters<P, R>) {
    this[$Props] = (params[0] || {}) as ComponentProps<P, R>;
  }

  /**
   * Component properties are read-only objects.
   * When the properties change, the component will re execute the build
   * and render according to the situation
   * @readonly
   * @property
   */
  get props(): Readonly<ComponentProps<P, R>> {
    return this[$Props];
  }

  /**
   * Retrieve the rendering context value of the specified type
   * @param providerClass Provider class that provides context value
   * @returns context value (readonly)
   * @method
   */
  use<T extends ProviderType<any>>(
    providerClass: T,
  ): Readonly<InstanceType<T>["value"]> | void {
    if (providerClass[$Identify] !== "Provider") return;
    let target = this[$Parent];
    while (target) {
      if (target instanceof providerClass) return target.value;
      target = target[$Parent];
    }
  }

  /**
   * Generate component rendering content, do not include time-consuming logic,
   * cannot be asynchronous, and must return component elements
   * @returns Component element (subtree root)
   * @virtual
   * @method
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
  onUpdated?: () => void;

  /**
   * Component lifecycle hook method
   * Triggered when component creation is completed and available
   * @callback
   * @method
   */
  onCreated?: () => void;

  /**
   * Component lifecycle hook method
   * Triggered during component destruction
   * @callback
   * @method
   */
  onDestroy?: () => void;
}
