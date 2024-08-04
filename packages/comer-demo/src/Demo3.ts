import { Component, observable, delegate } from "comer";
import { Button, Div, Text } from "comer-dom";

@delegate
export class Display extends Component<{ value: number }> {
  build(): Component {
    const { value } = this.props;
    return new Text(String(value > 1 ? 1 : value));
  }
}

@delegate
export class Demo extends Component {
  state = observable({ value: 0 });
  onButtonClick = () => {
    this.state.value++;
  };
  build() {
    return new Div({
      children: [
        new Button({
          children: new Text(`Click: ${this.state.value}`),
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
