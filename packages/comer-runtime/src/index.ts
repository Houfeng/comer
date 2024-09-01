import { resolve } from "path";

import {
  Application,
  Window,
  View,
  Control,
  TextBox,
} from "../binary/Comer.Runtime";

// -------------------------------------------------------------------------

function inherit(sub: Function, base: Function) {
  Object.setPrototypeOf(sub.prototype, base.prototype);
  Object.setPrototypeOf(sub, base);
}

inherit(View, Control);
inherit(TextBox, Control);
inherit(Window, View);

// -------------------------------------------------------------------------
process.chdir(resolve(__dirname, "../binary"));

function mainLoop() {
  Application.tick();
  setImmediate(mainLoop);
}

Application.run = () => mainLoop();

// -------------------------------------------------------------------------
export * from "../binary/Comer.Runtime";
