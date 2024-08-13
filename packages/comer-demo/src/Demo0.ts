import { Component, delegate, Fragment } from "comer";
import { Button, Div, StyleSheet } from "comer-dom";

const Btn = StyleSheet({
  padding: "8px 16px",
  color: "tomato",
  margin: "4px",
});

@delegate
export class Demo extends Component {
  build() {
    return new Div({
      children: [
        new Button({ className: Btn, innerText: "Before" }),
        new Fragment([
          new Button({ className: Btn, innerText: "M1" }),
          new Button({ className: Btn, innerText: "M2" }),
        ]),
        new Button({ className: Btn, innerText: "After" }),
      ],
    });
  }
}
