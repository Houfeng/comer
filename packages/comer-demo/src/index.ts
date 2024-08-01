import { Component, Ref } from "comer";
import { Button, Div, Footer, Header, Main, renderer, text } from "comer-dom";

class App extends Component {
  mainRef = new Ref<Main>();
  build(): Component {
    return new Div({
      children: [
        new Header({
          children: text("Header"),
        }),
        new Main({
          ref: this.mainRef,
          children: text("Main"),
        }),
        new Footer({
          children: new Button({
            children: text("Click me"),
            onClick: (event: MouseEvent) => {
              console.log("click", event.target);
            },
          }),
        }),
      ],
    });
  }
}

const app = renderer.render(new App(), document.getElementById("root")!);

Object.assign(window, { renderer, app });
