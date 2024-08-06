import { Component, type ComponentType } from "./Component";
import { $Props } from "./Symbols";

/** @internal */
export class Delegate extends Component<any> {
  constructor(
    props: any,
    public Target: ComponentType<any, any>,
  ) {
    super(props);
  }
  target?: InstanceType<ComponentType<any, any>>;
  build(): Component {
    if (!this.target) {
      if (this.Target instanceof Delegate) {
        throw new Error("Delegate cannot point to other Delegates");
      }
      this.target = new this.Target(this.props);
    } else {
      Object.assign(this.target[$Props], this[$Props]);
    }
    return this.target;
  }
}

/**
 * Declare a component as a delegate to reduce the cost of re rendering.
 *
 * Tips: When a delegated component is inherited, it contains the properties
 * and methods of the target component.
 * But when creating an instance through new, it is an instance of Delegate
 *
 * @param Target Target component
 * @returns Delegate component
 * @function
 */
export function delegate<T extends ComponentType<any, any>>(Target: T): T {
  const Super = Target as ComponentType<any, any>;
  class Wrapper extends Super {
    constructor(props: ConstructorParameters<T>[0]) {
      if (!new.target || new.target === Wrapper) {
        return new Delegate(props, Target);
      }
      super(props);
    }
  }
  Object.defineProperty(Wrapper, "name", { value: Target.name });
  return Wrapper as T;
}
