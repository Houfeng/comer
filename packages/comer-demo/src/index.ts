import { renderer } from "comer-dom";
import { Demo } from "./Demo9";

const root = document.getElementById("root")!;
const app = renderer.render(new Demo(), root);
Object.assign(window, { renderer, app });
