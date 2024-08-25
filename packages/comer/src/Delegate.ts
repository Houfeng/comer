import { Component, type ComponentConstructor } from "./Component";
import { $Props } from "./Symbols";

/** @internal */
export class Delegate extends Component<any> {
  constructor(
    props: any,
    public Target: ComponentConstructor<any, any>,
  ) {
    super(props);
  }
  private target?: InstanceType<ComponentConstructor<any, any>>;
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
 * @param target Target component
 * @returns Delegate component
 * @function
 * @decorator
 */
export function delegate<T extends ComponentConstructor<any, any>>(
  target: T,
): T {
  const DelegateSuper = target as ComponentConstructor<any, any>;
  class DelegateWrapper extends DelegateSuper {
    constructor(props: ConstructorParameters<T>[0]) {
      if (!new.target || new.target === DelegateWrapper) {
        return new Delegate(props, target);
      }
      super(props);
    }
  }
  Object.defineProperty(DelegateWrapper, "name", { value: target.name });
  return DelegateWrapper as T;
}
