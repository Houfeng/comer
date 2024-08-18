import { delegate, Component } from "comer";
import { Block } from "../components/Block";
import { ElementTreeModel } from "./ElementTreeModel";
import { ElementTreeNodeView } from "./ElementTreeNodeView";

@delegate
export class ElementTreeView extends Component {
  model = new ElementTreeModel();
  toggleInspecting = () => this.model.toggleInspecting();
  build(): Component {
    const { inspecting, root } = this.model;
    return new Block({
      icon: "pointer",
      title: "Elements",
      iconChecked: inspecting,
      onIconClick: this.toggleInspecting,
      body: new ElementTreeNodeView({ model: this.model, node: root }),
    });
  }
}
