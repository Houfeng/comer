import { Component, Ref } from "comer";
import { Button, Div, Footer, Header, Main, renderer, Text } from "comer-dom";

class App extends Component {
  mainRef = new Ref<Main>();
  build(): Component {
    return new Div({
      children: [
        new Header({
          children: new Text("Header"),
        }),
        new Main({
          ref: this.mainRef,
          children: new Text("Main"),
        }),
        new Footer({
          children: new Button({
            children: new Text("Click me"),
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
