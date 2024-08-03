import { Component, observable, delegate } from "comer";
import { Button, Div, Text } from "comer-dom";

@delegate
export class Display extends Component<{ value: number }> {
  build(): Component {
    return new Text(`Value: ${this.props.value}`);
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
        new Display({ value: this.state.value }),
        new Button({
          children: new Text(`Click: ${this.state.value}`),
          onClick: this.onButtonClick,
          "x-a": "1",
        }),
      ],
    });
  }
}
