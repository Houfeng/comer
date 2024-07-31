import { Component } from "./Component";

export class Fragment extends Component<Component[]> {
  constructor(props?: Component[] | Component) {
    const items = props || [];
    super(Array.isArray(items) ? items : [items]);
  }
  build(): Component {
    this.__children__ = this.__props__ || [];
    return this;
  }
}