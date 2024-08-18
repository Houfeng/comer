import { Component, delegate } from "comer";
import { Block } from "../components/Block";
import { TextContent } from "comer-dom";

@delegate
export class ElementInfoView extends Component {
  build(): Component {
    return new Block({
      icon: "props",
      title: "Props",
      body: new TextContent("..."),
    });
  }
}
