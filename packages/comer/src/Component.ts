import { OptionalKeyOf, RequiredKeyOf } from "./TypeUtil";

/**
 * Component abstract class, the base class for all components
 */
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
  __parent__?: Component;

  constructor(...args: A) {
    this.__props__ = { ...(args[0] as P) };
  }

  protected get props(): Readonly<P> {
    return this.__props__;
  }

  build(): Component {
    throw new Error('Unimplemented build method');
  }

  update?: () => void;
  mount?: () => void;
  unmount?: () => void;

}

export class View extends Component<{ x?: number, children: 1 }> {
}