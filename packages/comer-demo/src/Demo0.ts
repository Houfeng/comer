import { Component, observable, delegate, Deferrable } from "comer";
import { Button, Div, Input, TextContent } from "comer-dom";

@delegate
export class Demo extends Component {
  private state = observable({ value: 0 });
  private onButtonClick = () => {
    this.state.value++;
  };
  build() {
    const { value } = this.state;
    return new Div({
      children: [
        new Input({
          value: String(value),
          onInput: (event) => {
            this.state.value = Number(event.target.value);
          },
        }),
        new Deferrable(
          new Array(value).fill("1").map((_, i) => new TextContent(` ${i} `)),
        ),
        new Button({
          style: { color: "red" },
          children: new TextContent(`Click: ${this.state.value}`),
          onClick: this.onButtonClick,
        }),
      ],
    });
  }
}
