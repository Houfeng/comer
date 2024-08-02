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
  mainRef = new Ref<Main>();
  state = observable({ value: 0 });
  onButtonClick = () => {
    this.state.value++;
    console.log("click", this.mainRef.current);
  };
  build() {
    return new Div({
      children: new ThemeProvider({
        children: [
          new Header({ children: text("Header") }),
          new Main({
            ref: this.mainRef,
            children: [
              text("Main"),
              text(`Current: ${this.state.value}`),
              new Button({
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
