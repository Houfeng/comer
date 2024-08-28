const { resolve } = require('path');
const { Application, Window, View, HorizontalAlign, VerticalAlign, Widget } = require('../Comer.Runtime/bin/node/Comer.Runtime');

process.chdir(resolve(__dirname, '../Comer.Runtime/bin/node/'));

Application.init();

Object.setPrototypeOf(View.prototype, Widget.prototype);
Object.setPrototypeOf(Window.prototype, Widget.prototype);

const win = new Window();

win.position = [100, 100];
win.width = 200;
win.height = 200;

const view = new View();
view.background = "blue";
view.height = 100;
view.verticalAlign = VerticalAlign.Top;
view.horizontalAlign = HorizontalAlign.Fill;
view.borderWidth = [5, 5, 5, 5];
view.borderColor = 'red';

win.appendChild(view);
win.show();

function loop() {
  Application.tick();
  setImmediate(loop);
}
loop();
