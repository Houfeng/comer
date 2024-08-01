import { Component } from "./Component";
import { Fragment } from "./Fragment";
import { PROVIDER } from "./Symbols";

export type ProviderProps<T> = {
  value?: T;
  children: Component[] | Component;
};

export abstract class Provider<T> extends Component<ProviderProps<T>> {
  static readonly [PROVIDER] = true;

  build(): Component {
    return new Fragment(this.props.children);
  }

  get value() {
    return this.props.value;
  }
}

export type ProviderType<T = any> = {
  new (...args: ConstructorParameters<typeof Provider<T>>): Provider<T>;
} & {
  readonly [PROVIDER]: true;
};

export function createProvider<T>(defaultValue?: T): ProviderType<T> {
  return class extends Provider<T> {
    constructor(props: ProviderProps<T>) {
      props.value = props.value ?? defaultValue;
      super(props);
    }
  };
}
