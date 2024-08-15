import { Component } from "comer";
import { Label, styled, TextContent } from "comer-dom";

const StyledLabel = styled(Label, {
  verticalAlign: "middle",
  padding: "4px",
  margin: "4px",
});

export class SectionTitle extends Component<{
  text: string;
}> {
  constructor(text: string) {
    super({ text });
  }
  build(): Component {
    const { text } = this.props;
    return new StyledLabel({
      children: new TextContent(text),
    });
  }
}
