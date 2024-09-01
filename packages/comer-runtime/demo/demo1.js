import { Application, Window, View, TextBox } from '../';

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
view.boxShadow = '0 25 30 0 DarkGray';
view.width = 200;
view.onPointerDown = () => {
  win.height = 400;
  win.width = 300;
  view.width = NaN;
};

var box = new TextBox();
box.horizontalAlign = HorizontalAlign.Left;
box.multiLine = true;
box.onChange = () => {
  console.log('Input:', box.value);
}
view.appendChild(box);

win.appendChild(view);
win.show();

Application.run();