import { Component } from "comer";
import { Label as HtmlLabel, styled, TextContent } from "comer-dom";

const LabelWrapper = styled(HtmlLabel, {
  verticalAlign: "middle",
  padding: "4px",
  margin: "4px",
});

export class Label extends Component<{ text: string }> {
  constructor(text: string) {
    super({ text });
  }
  build(): Component {
    const { text } = this.props;
    return new LabelWrapper({
      children: new TextContent(text),
    });
  }
}
