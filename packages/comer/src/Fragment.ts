import { Component } from "./Component";

export class Fragment extends Component<Component[]> {
  build(): Component {
    this.__children__ = this.__props__ || [];
    return this;
  }
}
