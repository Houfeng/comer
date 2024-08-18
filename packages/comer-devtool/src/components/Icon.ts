import { Component } from "comer";
import { I, styled } from "comer-dom";

const IconWrapper = styled(I, {
  verticalAlign: "middle",
  width: "16px",
  height: "16px",
  cursor: "default",
  "&[data-checked='true']": {
    color: "dodgerblue",
    fontWeight: "bold",
  },
});

export class Icon extends Component<{
  name: "pointer" | "context" | "props";
  checked?: boolean;
  onClick?: () => void;
}> {
  build(): Component {
    const { name, checked = false, onClick } = this.props;
    return new IconWrapper({
      className: `comer comer-${name}`,
      onClick,
      "data-checked": String(checked),
    });
  }
}
