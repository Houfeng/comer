import { Component } from "./Component";
import { $Children } from "./Symbols";

/**
 * Component elements fragment
 * @class
 * @sealed
 */
export class Fragment extends Component<{ children: Component[] }> {
  constructor(items?: Readonly<Component[] | Component>) {
    const children = items ? (Array.isArray(items) ? items : [items]) : [];
    super({ children });
  }
  build(): Component {
    this[$Children] = this.props.children || [];
    return this;
  }
}
