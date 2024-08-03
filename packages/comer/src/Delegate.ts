import { Component, type ComponentType } from "./Component";

/** @internal */
export class Delegate extends Component<any> {
  constructor(
    props: any,
    public Raw: ComponentType<any, any>,
  ) {
    super(props);
  }
  build(): Component {
    return new this.Raw(this.props);
  }
}

/**
 * Declare a component as a widget to reduce the cost of re rendering
 * @param Raw component
 * @returns
 */
export function delegate<T extends ComponentType<any, any>>(
  RawComponent: T,
): T {
  const Super = RawComponent as ComponentType<any, any>;
  class Wrapper extends Super {
    constructor(props: ConstructorParameters<T>[0]) {
      if (!new.target || new.target === Wrapper) {
        return new Delegate(props, RawComponent);
      }
      super(props);
    }
  }
  Object.defineProperty(Wrapper, "name", { value: RawComponent.name });
  return Wrapper as T;
}
