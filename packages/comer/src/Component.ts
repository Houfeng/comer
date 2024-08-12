import { ReactiveFunction } from "ober";
import { OptionalKeyOf, RequiredKeyOf } from "./TypeUtil";
import { Ref } from "./Ref";
import { $Props, $Children, $Parent, $Identify, $Reactiver } from "./Symbols";
import { type ProviderType } from "./Provider";

/**
 * ComponentProps type utils
 */
export type ComponentProps<TProps extends object, TRef extends object> = {
  ref?: Ref<TRef>;
  key?: unknown;
} & TProps;

/**
 * ComponentParameters type utils
 */
export type ComponentParameters<TProps extends object, TRef extends object> =
  RequiredKeyOf<TProps> extends never
    ? OptionalKeyOf<TProps> extends never
      ? Parameters<() => void>
      : Parameters<(props?: ComponentProps<TProps, TRef>) => void>
    : Parameters<(props: ComponentProps<TProps, TRef>) => void>;

/**
 * Component class type
 * @internal
 */
export type ComponentType<TProps extends object, TRef extends object> = {
  new (...params: ComponentParameters<TProps, TRef>): Component<TProps, TRef>;
};

/**
 * Component abstract class, the base class for all components
 * @abstract
 * @class
 */
export abstract class Component<
  TProps extends object = {},
  TRef extends object = {},
> {
  /** @internal */
  [$Props]: ComponentProps<TProps, TRef>;

  /** @internal */
  [$Children]?: Component[];

  /** @internal */
  [$Parent]?: Component;

  /** @internal */
  [$Reactiver]?: ReactiveFunction;

  constructor(...params: ComponentParameters<TProps, TRef>) {
    this[$Props] = (params[0] || {}) as ComponentProps<TProps, TRef>;
  }

  /**
   * Component properties are read-only objects.
   * When the properties change, the component will re execute the build
   * and render according to the situation
   * @readonly
   * @property
   */
  protected get props(): Readonly<
    Omit<ComponentProps<TProps, TRef>, "ref" | "key">
  > {
    return this[$Props];
  }

  /**
   * Retrieve the rendering context value of the specified type
   * @param providerClass Provider class that provides context value
   * @returns context value (readonly)
   * @method
   */
  protected use<T extends ProviderType<any>>(
    providerClass: T,
  ): Readonly<InstanceType<T>["value"]> | void {
    return useContext(this, providerClass);
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
   * Triggered when component creation is completed and available
   * @callback
   * @method
   */
  onCreated?: () => void;

  /**
   * Component lifecycle hook method
   * Triggered when a component is updated
   * @callback
   * @method
   */
  onUpdated?: () => void;

  /**
   * Component lifecycle hook method
   * Triggered during component destruction
   * @callback
   * @method
   */
  onDestroy?: () => void;
}

/**
 * @internal
 */
export function useContext<TProvider extends ProviderType<any>>(
  component: Component,
  providerClass: TProvider,
): Readonly<InstanceType<TProvider>["value"]> | void {
  if (!component || !providerClass) return;
  if (providerClass[$Identify] !== "Provider") return;
  let target = component[$Parent];
  while (target) {
    if (target instanceof providerClass) return target.value;
    target = target[$Parent];
  }
}
