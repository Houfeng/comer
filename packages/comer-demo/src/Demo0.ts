import { Component, observable, delegate, Deferrable } from "comer";
import { Button, Div, Input, TextContent } from "comer-dom";

@delegate
export class Demo extends Component {
  state = observable({ value: 0 });
  onButtonClick = () => {
    this.state.value++;
  };
  build() {
    const { value } = this.state;
    return new Div({
      children: [
        new TextContent(`~${value}`),
        new Input({
          value: String(value),
          onInput: (event) => {
            this.state.value = Number(event.target.value);
          },
        }),
        new Div({
          children: new Deferrable({
            children: new Array(value)
              .fill("1")
              .map((it) => new TextContent(String(it))),
          }),
        }),
        new Button({
          style: { color: 'red' },
          children: new TextContent(`Click: ${this.state.value}`),
          onClick: this.onButtonClick,
        }),
      ],
    });
  }
}
