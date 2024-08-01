import { Component, createProvider, Ref } from "comer";
import { Button, Div, Footer, Header, Main, renderer, text } from "comer-dom";

const ThemeProvider = createProvider<number>(1);

class ThemeButton extends Component {
  build(): Component {
    const th = this.use(ThemeProvider);
    return new Button({
      children: text(String(th)),
    });
  }
}

class App extends Component {
  mainRef = new Ref<Main>();
  onButtonClick = () => {
    console.log("click", this.mainRef.current);
  };
  build(): Component {
    return new Div({
      children: new ThemeProvider({
        children: [
          new Header({ children: text("Header") }),
          new Main({
            ref: this.mainRef,
            children: [
              text("Main"),
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

const app = renderer.render(new App(), document.getElementById("root")!);

Object.assign(window, { renderer, app });
