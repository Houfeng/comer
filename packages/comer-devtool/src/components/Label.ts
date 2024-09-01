import { Component } from "comer";
import { Label as HtmlLabel, styled, TextContent } from "comer-dom";

const LabelWrapper = styled(HtmlLabel, {
  verticalAlign: "middle",
  padding: "4px",
  margin: "4px",
});

export type LabelProps = { text: string; className?: string };

export class Label extends Component<LabelProps> {
  constructor(props: string | LabelProps) {
    const composedProps = typeof props === "string" ? { text: props } : props;
    super(composedProps);
  }
  build(): Component {
    const { text, className } = this.props;
    return new LabelWrapper({
      className,
      children: new TextContent(text),
    });
  }
}
