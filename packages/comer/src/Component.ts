import { ReactiveFunction } from "ober";
import { OptionalKeyOf, RequiredKeyOf } from "./TypeUtil";
import { Ref } from "./Ref";
import {
  $Props,
  $Children,
  $Parent,
  $Identify,
  $Reactive,
  $Prev,
  $Build,
  $Mount,
  $Update,
  $Step,
} from "./Symbols";

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
 * Component class constructor
 */
export type ComponentConstructor<TProps extends object, TRef extends object> = {
  new (...params: ComponentParameters<TProps, TRef>): Component<TProps, TRef>;
  normalizeProps?: (props: object) => object;
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
  protected [$Props]: ComponentProps<TProps, TRef>;

  /** @internal */
  protected [$Children]?: Component[];

  /** @internal */
  protected [$Parent]?: Component;

  /** @internal */
  protected [$Prev]?: Component;

  /** @internal */
  protected [$Reactive]?: ReactiveFunction<() => Component>;

  /** @internal */
  protected [$Build]?: () => void;

  /** @internal */
  protected [$Update]?: () => void;

  /** @internal */
  protected [$Mount]?: () => void;

  /** @internal */
  protected [$Step]?: number;

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
  get props(): Readonly<Omit<ComponentProps<TProps, TRef>, "ref" | "key">> {
    return this[$Props];
  }

  /**
   * Generate component rendering content, do not include time-consuming logic,
   * cannot be asynchronous, and must return component elements
   * @returns Component element (subtree root)
   * @method
   * @virtual
   */
  build(): Component {
    throw new Error("Unimplemented build method");
  }

  /**
   * Retrieve the rendering context value of the specified type
   * @param providerClass Provider class that provides context value
   * @returns context value (readonly)
   * @method
   */
  protected use<T extends ProviderConstructorLike<any>>(
    providerClass: T,
  ): Readonly<InstanceType<T>["value"]> | void {
    return useContext(this, providerClass);
  }

  /**
   * Component lifecycle hook method
   * Triggered when component creation is completed and available
   * @method
   * @virtual
   */
  protected onCreated?(): void;

  /**
   * Component lifecycle hook method
   * Triggered when a component is updated
   * @method
   * @virtual
   */
  protected onUpdated?(): void;

  /**
   * Component lifecycle hook method
   * Triggered during component destruction
   * @method
   * @virtual
   */
  protected onDestroy?(): void;

  /**
   * Normalize the Props of all instances of the current component class
   * Be cautious when using, be sure to declare the type of props
   * @static
   * @method
   * @virtual
   */
  static normalizeProps?(props: object): object;
}

export interface ProviderConstructorLike<TValue = any> {
  readonly [$Identify]: "Provider";
  new (...args: any): {
    readonly value: TValue;
  };
}

/**
 * @internal
 */
export function useContext<TProvider extends ProviderConstructorLike>(
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
