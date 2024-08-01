import { Component, Provider, Ref } from "comer";
import { Button, Div, Footer, Header, Main, renderer, text } from "comer-dom";

class ThemeProvider extends Provider<number> {}

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
  build(): Component {
    return new ThemeProvider({
      value: 100,
      children: new Div({
        children: [
          new Header({ children: text("Header") }),
          new Main({ ref: this.mainRef, children: text("Main") }),
          new Footer({
            children: [
              new Button({
                children: text("Click me"),
                onClick: (event: MouseEvent) => {
                  console.log("click", event.target, this.mainRef.current);
                },
              }),
              new ThemeButton(),
            ],
          }),
        ],
      }),
    });
  }
}

const app = renderer.render(new App(), document.getElementById("root")!);

Object.assign(window, { renderer, app });
