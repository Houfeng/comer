import { Component, Deferrable, delegate, observable } from "comer";
import { Button, Div, styled } from "comer-dom";

const StyledButton = styled(Button, {
  padding: "8px 16px",
  color: "#333",
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
