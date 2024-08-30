const { resolve } = require('path');

const {
  Application, Window, View, HorizontalAlign, VerticalAlign, Control
} = require('../Comer.Runtime/bin/node/Comer.Runtime');

process.chdir(resolve(__dirname, '../Comer.Runtime/bin/node/'));

Object.setPrototypeOf(View.prototype, Control.prototype);
Object.setPrototypeOf(View, Control);

Object.setPrototypeOf(Window.prototype, View.prototype);
Object.setPrototypeOf(Window, View);

Application.init();

const win = new Window();

win.title = "Demo";
win.width = 400;
win.height = 400;

const view = new View();
view.background = "blue";
view.height = 100;
view.verticalAlign = VerticalAlign.Top;
view.horizontalAlign = HorizontalAlign.Fill;
view.borderWidth = "5 20";
view.borderColor = 'red';
view.boxShadow = '5 5 10 0 DarkGray';
view.addEventListener("PointerPressed", () => {
  console.log('PointerPressed');
});

const view2 = new View();
view.appendChild(view2);

win.padding = "5";
win.background = '#aaf';

win.appendChild(view);
win.show();

console.log('++++++1', win instanceof View);

function loop() {
  win.title = Date.now().toString();
  Application.tick();
  setImmediate(loop);
}
loop();
