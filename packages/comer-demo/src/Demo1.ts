import { Component, createProvider, observable, Ref } from "comer";
import { Button, Div, Footer, Header, Main, text } from "comer-dom";

const ThemeProvider = createProvider<number>(1);

class ThemeButton extends Component {
  build(): Component {
    const th = this.use(ThemeProvider);
    return new Button({
      children: text(String(th)),
    });
  }
}

export class Demo extends Component {
  ref = new Ref<Button>();
  state = observable({ value: 0 });
  onButtonClick = () => {
    this.state.value++;
    console.log("click", this.ref.current);
    // this.ref.current?.hostElement.value;
  };
  build() {
    return new Div({
      children: new ThemeProvider({
        children: [
          new Header({ children: text("Header") }),
          new Main({
            children: [
              text("Main"),
              text(`Current: ${this.state.value}`),
              new Button({
                ref: this.ref,
                children: text("Click me"),
                onClick: this.onButtonClick,
              }),
              new ThemeButton(),
            ],
          }),
          new Footer({ children: text("Footer") }),
        ],
      }),
    });
  }
}
