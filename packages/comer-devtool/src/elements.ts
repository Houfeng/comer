import { Component, delegate } from "comer";
import { Div, renderer, styled, TextContent } from "comer-dom";

const Container = styled(Div, {
  height: "100vh",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr 25%",
  "&, & *": {
    boxSizing: "border-box",
  },
  fontSize: "13px",
  color: "#555",
});

const MainView = styled(Div, {});

const SideView = styled(Div, {
  backgroundColor: "#fefefe",
  borderLeft: "1px solid #e3e3e3",
});

const BarWrapper = styled(Div, {
  backgroundColor: "#fafafa",
  padding: "8px 10px",
  borderBottom: "1px solid #e3e3e3",
  userSelect: "none",
});

@delegate
export class Demo extends Component {
  build() {
    return new Container({
      children: [
        new MainView({
          children: [
            new BarWrapper({
              children: new TextContent("Elements"),
            }),
          ],
        }),
        new SideView({
          children: [
            new BarWrapper({
              children: new TextContent("Props"),
            }),
          ],
        }),
      ],
    });
  }
}

renderer.render(new Demo(), document.getElementById("root")!);
