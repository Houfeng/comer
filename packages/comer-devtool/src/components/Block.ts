import { Component } from "comer";
import { Header, Main, Section, styled } from "comer-dom";
import { Icon } from "./Icon";
import { Label } from "./Label";

const BlockWrapper = styled(Section, {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  "&+&": {
    borderLeft: "1px solid #e3e3e3",
  },
});

const BlockHeaderWrapper = styled(Header, {
  backgroundColor: "#fafafa",
  padding: "0 10px",
  borderBottom: "1px solid #e3e3e3",
  userSelect: "none",
  height: "38px",
  lineHeight: "36px",
});

const BlockBodyWrapper = styled(Main, {
  flex: "1",
  padding: "10px",
  overflow: "auto",
});

export type BlockProps = {
  icon: ConstructorParameters<typeof Icon>[0]["name"];
  iconChecked?: boolean;
  onIconClick?: () => void;
  title: string;
  body: Component | Component[];
};

export class Block extends Component<BlockProps> {
  build(): Component {
    const { icon, iconChecked, onIconClick } = this.props;
    const { body, title } = this.props;
    return new BlockWrapper({
      children: [
        new BlockHeaderWrapper({
          children: [
            new Icon({
              name: icon,
              checked: iconChecked,
              onClick: onIconClick,
            }),
            new Label(title),
          ],
        }),
        new BlockBodyWrapper({ children: body }),
      ],
    });
  }
}
