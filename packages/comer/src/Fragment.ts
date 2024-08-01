import { Component, func } from "./Component";
import { CHILDREN } from "./Symbols";

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

export const fragment = func(Fragment);
