import { OptionalKeyOf, RequiredKeyOf } from "./TypeUtil";

export abstract class Component<
  P extends object = object,
  A extends Array<any> =
  RequiredKeyOf<P> extends never
  ? OptionalKeyOf<P> extends never
  ? Parameters<() => void> : Parameters<(props?: P) => void>
  : Parameters<(props: P) => void>,
> {

  /**  @internal */
  __props__: P;

  /**  @internal */
  __children__: Component[];

  constructor(...args: A) {
    this.__props__ = { ...(args[0] as P) };
  }

  protected get props(): P {
    return this.__props__;
  }

  mount(): void { }

  unmount(): void { }

  build(): Component {
    throw new Error('Unimplemented build method');
  }


}

export class View extends Component<{ x?: number, children: 1 }> {
}