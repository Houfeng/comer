import { Component, Deferrable, delegate, observable } from "comer";
import { Button, Div, StyleClass } from "comer-dom";

const btnClass = new StyleClass({
  padding: "8px 16px",
  color: "#FFFFFF",
  margin: "4px",
});

@delegate
export class Demo extends Component {
  state = observable({ value: 0 });
  onBtnClick = () => {
    this.state.value++;
  };
  build() {
    const { value } = this.state;
    return new Div({
      children: [
        new Button({ className: btnClass, innerText: String(value) }),
        new Deferrable([
          new Button({ className: btnClass, innerText: "M1" }),
          new Button({ className: btnClass, innerText: "M2" }),
        ]),
        new Button({
          className: btnClass,
          innerText: "Click",
          onClick: this.onBtnClick,
        }),
      ],
    });
  }
}
