import { Component, type ComponentType } from "./Component";

class Widget extends Component<any> {
  constructor(
    props: any,
    public RawComponent: ComponentType<any, any>,
  ) {
    super(props);
  }
  build(): Component {
    const element = new this.RawComponent(this.props);
    return element.build();
  }
}

/**
 *
 * @param Raw component
 * @returns
 */
export function widget<T extends ComponentType<any, any>>(RawComponent: T): T {
  const Super = RawComponent as ComponentType<any, any>;
  class Wrapper extends Super {
    constructor(props: ConstructorParameters<T>[0]) {
      if (!new.target || new.target === Wrapper) {
        return new Widget(props, RawComponent);
      }
      super(props);
    }
  }
  Object.defineProperty(Wrapper, "name", { value: RawComponent.name });
  return Wrapper as T;
}
