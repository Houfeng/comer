import { Component, observable, widget } from "comer";
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

@widget
export class Test extends Component<{ x: 1 }> {
  static type = "Test";
  name = "test";
}

export class SubTest extends Test {
  sub = 0;
}

const test = new Test({ x: 1 });
console.log("test", { test, Test });
Object.assign(window, { widget, test, Test, SubTest, Component, Demo });

// const subTest = new SubTest({ x: 1 });
// console.log('subTest', subTest);

// console.log(subTest instanceof Test);
