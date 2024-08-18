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
  name: "pointer" | "context" | "props" | "expanded" | "collapsed";
  checked?: boolean;
  onClick?: () => void;
  className?: string;
}> {
  build(): Component {
    const { className = "", name, checked = false, onClick } = this.props;
    return new IconWrapper({
      className: `comer comer-${name} ${className}`.trim(),
      onClick,
      "data-checked": String(checked),
    });
  }
}
