import { renderer } from "comer-dom";
import { Demo } from "./Demo2";

const app = renderer.render(new Demo(), document.getElementById("root")!);

Object.assign(window, { renderer, app });
