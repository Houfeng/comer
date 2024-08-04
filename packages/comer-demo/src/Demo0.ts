import { Component, observable, delegate } from "comer";
import { Button, Div, Text } from "comer-dom";

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
        new Text(`~${value}`),
        value % 2 === 0 ? new Text(`#${value}`) : new Text(`@${value}`),
        // ...new Array(value).fill("1").map((it) => new Text(String(it))),
        new Button({
          children: new Text(`Click: ${this.state.value}`),
          onClick: this.onButtonClick,
        }),
      ],
    });
  }
}
