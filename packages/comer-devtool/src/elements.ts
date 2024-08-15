import { Component, delegate } from "comer";
import { renderer } from "comer-dom";
import { Container } from "./components/Container";
import { MainView } from "./components/MainView";
import { SideView } from "./components/SideView";
import { SectionBar } from "./components/SectionBar";
import { Icon } from "./components/Icon";
import { SectionTitle } from "./components/SectionTitle";
import { ElementModel } from "./models/ElementsModel";

@delegate
export class Demo extends Component {
  model = new ElementModel();
  toggleInspecting = () => this.model.toggleInspecting();
  build() {
    const { inspecting } = this.model;
    return new Container({
      children: [
        new MainView({
          children: [
            new SectionBar({
              children: [
                new Icon({
                  name: "pointer",
                  checked: inspecting,
                  onClick: this.toggleInspecting,
                }),
                new SectionTitle("Elements"),
              ],
            }),
          ],
        }),
        new SideView({
          children: [
            new SectionBar({
              children: [
                new Icon({ name: "props" }),
                new SectionTitle("Props"),
              ],
            }),
          ],
        }),
      ],
    });
  }
}

renderer.render(new Demo(), document.getElementById("root")!);
