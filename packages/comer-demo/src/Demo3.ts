import { Component, observable, delegate } from "comer";
import { Button, Div, TextContent } from "comer-dom";

@delegate
export class Display extends Component<{ value: number }> {
  protected build(): Component {
    const { value } = this.props;
    return new TextContent(String(value > 1 ? 1 : value));
  }
}

@delegate
export class Demo extends Component {
  private state = observable({ value: 0 });
  private onButtonClick = () => {
    this.state.value++;
  };
  protected build() {
    return new Div({
      children: [
        new Button({
          children: new TextContent(`Click: ${this.state.value}`),
          onClick: this.onButtonClick,
        }),
        new Div({
          children: new Array(10000)
            .fill(1)
            .map(() => new Display({ value: this.state.value })),
        }),
      ],
    });
  }
}
