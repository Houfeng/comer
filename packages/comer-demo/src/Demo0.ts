import { Component, Deferrable, delegate, observable } from "comer";
import { Button, Div, StyleClass, styled } from "comer-dom";

const button_class = StyleClass({
  padding: "8px 16px",
});

const StyledButtonBase = styled(Button, {
  $extends: button_class,
  color: "#333",
  margin: "4px",
});

const StyledButton = styled(StyledButtonBase, {
  color: "red",
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
        new StyledButton({ innerText: String(value) }),
        new Deferrable([
          new StyledButton({ innerText: "M1" }),
          new StyledButton({ innerText: "M2" }),
        ]),
        new StyledButton({ innerText: "Click", onClick: this.onBtnClick }),
      ],
    });
  }
}
