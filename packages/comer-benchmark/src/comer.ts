import { Component, delegate, observable } from "comer";
import { Div, renderer, TextContent } from "comer-dom";

@delegate
export class Demo extends Component {
  state = observable({ value: 0 });
  onBtnClick = () => {
    this.state.value++;
  };
  build() {
    return new Div({
      children: new TextContent("Comer"),
    });
  }
}

const root = document.getElementById("root")!;
renderer.render(new Demo(), root);
