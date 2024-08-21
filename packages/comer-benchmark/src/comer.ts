import { Component, Deferment, observable } from "comer";
import { Div, Input, InputEvent, renderer, Span, TextContent } from "comer-dom";

class Item extends Component<{ text: string }> {
  build(): Component {
    return new Span({
      children: new TextContent(this.props.text),
    });
  }
}

class List extends Component {
  state = observable({ num: 100, value: 1 });
  updateNum = (event: InputEvent<HTMLInputElement>) => {
    this.state.num = Number(event);
  };
  updateValue = (event: InputEvent<HTMLInputElement>) => {
    this.state.value = Number(event.target.value);
  };
  build() {
    const { num, value } = this.state;
    return new Div({
      children: [
        new Input({ value: String(num), onInput: this.updateNum }),
        new Input({ value: String(value), onInput: this.updateValue }),
        new Div({
          style: { wordWrap: "break-word", wordBreak: "break-all" },
          children: new Deferment(
            new Array(num)
              .fill(" ")
              .map((_, i) => new Item({ text: `${i}:${value}, ` })),
          ),
        }),
      ],
    });
  }
}

const root = document.getElementById("root")!;
renderer.render(new List(), root);
