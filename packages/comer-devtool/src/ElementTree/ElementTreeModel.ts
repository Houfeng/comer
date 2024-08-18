import { observable } from "comer";

export type ElementTreeNode = {
  title: string;
  expanded?: boolean;
  children?: ElementTreeNode[];
};

@observable
export class ElementTreeModel {
  inspecting = false;

  toggleInspecting() {
    this.inspecting = !this.inspecting;
  }

  root: ElementTreeNode = {
    title: "demo",
    children: [{ title: "sub1" }, { title: "sub2" }, { title: "sub3" }],
  };

  toggleExpandState(node: ElementTreeNode) {
    node.expanded = !node.expanded;
  }
}
