import { observable } from "comer";

export type ElementTreeNode = {
  title: string;
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
}
