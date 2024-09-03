import { resolve } from "path";

import {
  Application,
  // Window,
  // View,
  // Control,
  // TextBox,
  // StackView,
  // DockView,
} from "../binary/Comer.Runtime";

// -------------------------------------------------------------------------

// function inherit(sub: Function, base: Function) {
//   Object.setPrototypeOf(sub.prototype, base.prototype);
//   Object.setPrototypeOf(sub, base);
// }

// inherit(TextBox, Control);
// inherit(View, Control);
// inherit(StackView, View);
// inherit(DockView, View);
// inherit(Window, View);

// -------------------------------------------------------------------------
process.chdir(resolve(__dirname, "../binary"));

function mainLoop() {
  Application.tick();
  setImmediate(mainLoop);
}

Application.run = () => mainLoop();

// -------------------------------------------------------------------------
export * from "../binary/Comer.Runtime";
