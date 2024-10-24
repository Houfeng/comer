import { Component, Deferment, observable } from "comer";
import { Div, Input, InputEvent, Span, TextContent } from "comer-dom";

class Item extends Component<{ text: string }> {
  build(): Component {
    return new Span({
      children: new TextContent(this.props.text),
    });
  }
}

export class Demo extends Component {
  readonly state = observable({ num: 100, value: 1 });
  updateNum = (event: InputEvent<HTMLInputElement>) => {
    this.state.num = Number(event.target.value);
  };
  updateValue = (event: InputEvent<HTMLInputElement>) => {
    this.state.value = Number(event.target.value);
  };
  build() {
    const { num, value } = this.state;
    return new Div({
      children: [
        new Input({ key: "n", value: String(num), onInput: this.updateNum }),
        new Input({
          key: "v",
          value: String(value),
          onInput: this.updateValue,
        }),
        new Deferment(
          new Div({
            style: { wordWrap: "break-word", wordBreak: "break-all" },
            children: new Array(num)
              .fill(" ")
              .map((_, i) => new Item({ text: `${i}:${value}, ` })),
          }),
        ),
      ],
    });
  }
}
