import { observable } from "ober";
import { Component } from "./Component";
import { Fragment } from "./Fragment";
import { $Identify, $State } from "./Symbols";

export type ProviderProps<TValue> = {
  value?: TValue;
  children: Component[] | Component;
  /** @internal */
  readonly?: boolean;
};

/**
 * Component used to provide context values
 * @abstract
 * @class
 */
export abstract class Provider<TValue> extends Component<
  ProviderProps<TValue>
> {
  static readonly [$Identify] = "Provider";

  build(): Component {
    return new Fragment(this.props.children);
  }

  private [$State]?: { value?: TValue };

  protected onUpdated(): void {
    const { readonly, value } = this.props;
    if (readonly || !this[$State]) return;
    this[$State].value = value;
  }

  get value() {
    const { value, readonly } = this.props;
    if (readonly) return value;
    if (!this[$State]) {
      this[$State] = observable({ value });
    }
    return this[$State].value;
  }
}

export type ProviderConstructor<TValue = unknown> = {
  new (
    ...args: ConstructorParameters<typeof Provider<TValue>>
  ): Provider<TValue>;
} & {
  readonly [$Identify]: "Provider";
};

/**
 * Create a context class of a specified value type
 * @param defaultValue The default value
 * @returns The provider class
 * @function
 */
export function createProvider<TValue>(
  defaultValue?: TValue,
): ProviderConstructor<TValue> {
  return class TypedProvider extends Provider<TValue> {
    constructor(props: ProviderProps<TValue>) {
      props.value = props.value ?? defaultValue;
      super(props);
    }
  };
}
