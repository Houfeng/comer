import { Component, createProvider, Ref } from "comer";
import { Button, Div, Footer, Header, Main, renderer, text } from "comer-dom";

const ThemeProvider = createProvider<number>();

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
      value: 0,
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
              ...new Array(5000).fill(1).map(
                (it, ix) =>
                  new Button({
                    children: text(`${it}:${ix}`),
                  }),
              ),
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
