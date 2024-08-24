import { Component, delegate, observable } from "comer";
import { Button, Div, styled, TextBlock } from "comer-dom";

const StyledButton = styled(Button, {
  color: "red",
  padding: "8px 16px",
  margin: "4px",
});

const state = observable({ value: 0 });

class Child extends Component<{ value: number }> {
  build(): Component {
    console.log('Build: child');
    return new Div({
      children: [
        new Div({ children: new TextBlock("Child") }),
        new TextBlock(String(this.props.value ?? state.value)),
      ],
    });
  }
}

class Parent extends Component {
  build(): Component {
    console.log('Build: parent');
    return new Div({
      children: [
        new Div({ children: new TextBlock("Parent") }),
        new TextBlock(String(state.value)),
        new Child({ value: state.value }),
      ],
    });
  }
}

@delegate
export class Demo extends Component {
  onBtnClick = () => {
    state.value++;
  };
  build() {
    return new Div({
      children: [
        new Parent(),
        new StyledButton({ innerText: "Click", onClick: this.onBtnClick }),
      ],
    });
  }
}
