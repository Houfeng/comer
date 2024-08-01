import { Component } from "./Component";
import { CHILDREN, PROPS } from "./Symbols";

export class Fragment extends Component<Component[]> {
  constructor(props?: Component[] | Component) {
    const items = props || [];
    super(Array.isArray(items) ? items : [items]);
  }
  build(): Component {
    this[CHILDREN] = this[PROPS] || [];
    return this;
  }
}
