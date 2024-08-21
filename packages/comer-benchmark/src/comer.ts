import { Component, delegate, Fragment, observable } from "comer";
import { Button, Div, styled, renderer } from "comer-dom";

const StyledButton = styled(Button, {
  color: "red",
  padding: "8px 16px",
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
        new Fragment([
          new StyledButton({ innerText: "M1" }),
          new StyledButton({ innerText: "M2" }),
        ]),
        new StyledButton({ innerText: String(value) }),
        new StyledButton({ innerText: "Click", onClick: this.onBtnClick }),
      ],
    });
  }
}

const root = document.getElementById("root")!;
const app = renderer.render(new Demo(), root);
Object.assign(window, { renderer, app });
