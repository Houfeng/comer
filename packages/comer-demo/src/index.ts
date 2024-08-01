import { Component, Ref } from "comer";
import { Button, Div, Footer, Header, Main, renderer, Span } from "comer-dom";

class App extends Component {
  mainRef = new Ref<Main>();
  build(): Component {
    return new Div({
      innerText: "Demo",
      children: [
        new Header({
          children: new Span({ innerText: "Header" }),
        }),
        new Main({
          ref: this.mainRef,
          innerText: "Hello word",
        }),
        new Footer({
          children: new Button({
            innerText: "Click me",
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
