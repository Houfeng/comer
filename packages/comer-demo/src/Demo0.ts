import { Component, Deferrable, delegate, observable } from "comer";
import { Button, Div, styled } from "comer-dom";

const StyledButton1 = styled(Button, {
  padding: "8px 16px",
  color: "#333",
  margin: "4px",
});

const StyledButton = styled(StyledButton1, {
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
