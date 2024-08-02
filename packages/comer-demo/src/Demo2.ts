import { Component, observable } from "comer";
import { Button, Div, Text } from "comer-dom";

export class Demo extends Component {
  state = observable({ value: 0 });
  onButtonClick = () => {
    this.state.value++;
  };
  build() {
    return new Div({
      children: [
        new Text(`Current: ${this.state.value}`),
        new Button({
          children: new Text("Click me"),
          onClick: this.onButtonClick,
        }),
      ],
    });
  }
}
