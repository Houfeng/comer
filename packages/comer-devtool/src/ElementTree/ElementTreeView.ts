import { delegate, Component } from "comer";
import { Div } from "comer-dom";
import { Block } from "../components/Block";
import { ElementTreeModel } from "./ElementTreeModel";

@delegate
export class ElementTreeView extends Component {
  model = new ElementTreeModel();
  toggleInspecting = () => this.model.toggleInspecting();
  build(): Component {
    const { inspecting } = this.model;
    return new Block({
      icon: "pointer",
      title: "Elements",
      iconChecked: inspecting,
      onIconClick: this.toggleInspecting,
      body: new Div(),
    });
  }
}
