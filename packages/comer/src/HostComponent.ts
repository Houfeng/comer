import { Component } from "./Component";
import { HostElement } from "./HostAdapter";


export abstract class HostComponent<
  P extends object,
  E extends HostElement,
> extends Component<P> {
  type = '';
  hostElement: E;
}