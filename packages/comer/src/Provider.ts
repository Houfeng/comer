import { Component } from "./Component";
import { Fragment } from "./Fragment";
import { $Identify } from "./Symbols";

export type ProviderProps<T> = {
  value?: T;
  children: Component[] | Component;
};

/**
 * Component used to provide context values
 * @abstract
 * @class
 */
export abstract class Provider<T> extends Component<ProviderProps<T>> {
  static readonly [$Identify] = "Provider";

  build(): Component {
    return new Fragment(this.props.children);
  }

  get value() {
    return this.props.value;
  }
}

export type ProviderType<T = unknown> = {
  new (...args: ConstructorParameters<typeof Provider<T>>): Provider<T>;
} & {
  readonly [$Identify]: "Provider";
};

/**
 * Create a context class of a specified value type
 * @param defaultValue The default value
 * @returns The provider class
 * @function
 */
export function createProvider<T>(defaultValue?: T): ProviderType<T> {
  return class extends Provider<T> {
    constructor(props: ProviderProps<T>) {
      props.value = props.value ?? defaultValue;
      super(props);
    }
  };
}
