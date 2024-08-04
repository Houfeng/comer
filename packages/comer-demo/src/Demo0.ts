import { Component, observable, delegate } from "comer";
import { Button, Div, Text } from "comer-dom";

@delegate
export class Display extends Component<{ value: number }> {
  build(): Component {
    console.log("Display++++++++build");
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
        new Display({ value: 100 }),
        new Button({
          children: new Text(`Click: ${this.state.value}`),
          onClick: this.onButtonClick,
          "x-a": "1",
        }),
      ],
    });
  }
}
