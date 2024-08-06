import { Component } from "./Component";
import { CHILDREN } from "./Symbols";

/**
 * Component element fragment
 * @class
 */
export class Fragment extends Component<{ children: Component[] }> {
  constructor(items?: Readonly<Component[] | Component>) {
    const children = items ? (Array.isArray(items) ? items : [items]) : [];
    super({ children });
  }
  build(): Component {
    this[CHILDREN] = this.props.children || [];
    return this;
  }
}
