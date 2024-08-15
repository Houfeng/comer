import { Component, delegate } from "comer";
import { Div, renderer, styled, TextContent } from "comer-dom";

const PopupWrapper = styled(Div, {
  padding: "16px",
});

@delegate
export class Demo extends Component {
  build() {
    return new PopupWrapper({
      children: [new TextContent("Comer DevTool")],
    });
  }
}

renderer.render(new Demo(), document.getElementById("root")!);
