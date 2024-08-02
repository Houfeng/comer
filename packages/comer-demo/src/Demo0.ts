import { Component, observable } from "comer";
import { Button, Text } from "comer-dom";

export class Demo extends Component {
  state = observable({ value: 0 });
  onButtonClick = () => {
    this.state.value++;
  };
  build() {
    return new Button({
      children: new Text(`Click: ${this.state.value}`),
      onClick: this.onButtonClick,
      "x-a": "1",
    });
  }
}
