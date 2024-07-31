import { HostElement } from "./HostAdapter";
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

  /**  @internal */
  __compose__?: () => HostElement;

  constructor(...args: A) {
    this.__props__ = { ...(args[0] as P) };
  }

  protected get props(): Readonly<P> {
    return this.__props__;
  }

  build(): Component {
    throw new Error('Unimplemented build method');
  }

  update(newProps: P, force = false): boolean {
    return !!newProps || force;
  }

  mount?: () => void;
  unmount?: () => void;

}

export class View extends Component<{ x?: number, children: 1 }> {
}