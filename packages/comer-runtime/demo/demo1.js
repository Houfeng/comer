const { resolve } = require('path');

const {
  Application, Window, View, HorizontalAlign, VerticalAlign, Control,
  RangeSizing
} = require('../Comer.Runtime/bin/node/Comer.Runtime');

process.chdir(resolve(__dirname, '../Comer.Runtime/bin/node/'));

Object.setPrototypeOf(View.prototype, Control.prototype);
Object.setPrototypeOf(View, Control);

Object.setPrototypeOf(Window.prototype, View.prototype);
Object.setPrototypeOf(Window, View);

Application.init();

const win = new Window();

win.title = "Demo";

const view = new View();
view.background = "black";
view.height = 100;
view.verticalAlign = VerticalAlign.Top;
view.horizontalAlign = HorizontalAlign.Fill;
view.borderColor = "red";
view.borderWidth = "10";
// view.backgroundSizing = RangeSizing.BorderOuter;
view.boxShadow = '0 25 30 0 DarkGray';

win.appendChild(view);
win.show();

(function loop() {
  Application.tick();
  setImmediate(loop);
})();