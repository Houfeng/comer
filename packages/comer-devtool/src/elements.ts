import { Component, delegate } from "comer";
import { Div, renderer, styled } from "comer-dom";
import { ElementTreeView } from "./ElementTree/ElementTreeView";
import { ElementInfoView } from "./ElementInfo";

export const ElementsContainerWrapper = styled(Div, {
  height: "100vh",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr 25%",
  "&, & *": {
    boxSizing: "border-box",
  },
  fontSize: "13px",
  color: "#555",
});

@delegate
export class Elements extends Component {
  build() {
    return new ElementsContainerWrapper({
      children: [new ElementTreeView(), new ElementInfoView()],
    });
  }
}

renderer.render(new Elements(), document.getElementById("root")!);
