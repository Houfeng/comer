import { Component, Ref } from "comer";
import { Button, Div, Footer, Header, Main, renderer } from "comer-dom";

class App extends Component {
  mainRef = new Ref<Main>();
  build(): Component {
    return new Div({
      innerText: "Demo",
      children: [
        new Header(),
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

renderer.render(new App(), document.getElementById("root")!);

console.log("renderer", renderer);
