const { resolve } = require('path');
const { Application, Window, View, HorizontalAlign, VerticalAlign, Vector, Widget } = require('../bin/node/Comer.Gui');

process.chdir(resolve(__dirname, '../bin/node/'));

Application.init();

Object.setPrototypeOf(View.prototype, Widget.prototype);
Object.setPrototypeOf(Window.prototype, Widget.prototype);

const win = new Window();

win.position = new Vector(10, 10);
win.width = 200;
win.height = 200;

const view = new View();
view.background = "blue";
view.height = 100;
view.verticalAlign = VerticalAlign.Top;
view.horizontalAlign = HorizontalAlign.Fill;

win.appendChild(view);
win.show();

function loop() {
  Application.tick();
  setImmediate(loop);
}
loop();
