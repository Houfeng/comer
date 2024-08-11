import { Component } from "./Component";
import { Fragment } from "./Fragment";
import { $Identify } from "./Symbols";

export type ProviderProps<TValue> = {
  value?: TValue;
  children: Component[] | Component;
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

  get value() {
    return this.props.value;
  }
}

export type ProviderType<TValue = unknown> = {
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
): ProviderType<TValue> {
  return class TypedProvider extends Provider<TValue> {
    constructor(props: ProviderProps<TValue>) {
      props.value = props.value ?? defaultValue;
      super(props);
    }
  };
}
