import { Component, createProvider, delegate, observable } from "comer";
import { Button, Div, styled, TextBlock } from "comer-dom";

const StyledButton = styled(Button, {
  color: "red",
  padding: "8px 16px",
  margin: "4px",
});

const DemoProvider = createProvider(1);

class DemoCustomer extends Component {
  build(): Component {
    const value = this.use(DemoProvider);
    return new Div({
      children: new TextBlock(String(value)),
    });
  }
}

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
        new DemoProvider({
          value: value,
          children: new DemoCustomer(),
        }),
        new StyledButton({ innerText: "Click", onClick: this.onBtnClick }),
      ],
    });
  }
}
