import { Component, createProvider, observable, Ref } from "comer";
import { Button, Div, Footer, Header, Main, TextContent } from "comer-dom";

const ThemeProvider = createProvider<number>(1);

class ThemeButton extends Component {
  build(): Component {
    const th = this.use(ThemeProvider);
    return new Button({
      children: new TextContent(String(th)),
    });
  }
}

export class Demo extends Component {
  private ref = new Ref<HTMLButtonElement>();
  private state = observable({ value: 0 });
  private onButtonClick = () => {
    this.state.value++;
    console.log("click", this.ref.current);
  };
  build() {
    return new Div({
      children: new ThemeProvider({
        children: [
          new Header({ children: new TextContent("Header") }),
          new Main({
            children: [
              new TextContent("Main"),
              new TextContent(`Current: ${this.state.value}`),
              new Button({
                ref: this.ref,
                children: new TextContent("Click me"),
                onClick: this.onButtonClick,
              }),
              new ThemeButton(),
            ],
          }),
          new Footer({ children: new TextContent("Footer") }),
        ],
      }),
    });
  }
}
