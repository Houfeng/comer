const {
  Application, Window, View, TextBox,
  VerticalAlign, HorizontalAlign,
  StackView,
} = require('../');

Application.init();

var win = new Window();
win.background = 'gray';
win.title = "Demo";

var stack = new StackView();
stack.spacing = 16;

console.log(stack instanceof View);

var view = new View();
view.background = "red";
view.height = 100;
view.verticalAlign = VerticalAlign.Top;
view.horizontalAlign = HorizontalAlign.Fill;
view.onPointerEnter = () => view.boxShadow = "0 25 30 0 DarkGray";
view.onPointerLeave = () => view.boxShadow = "";
stack.appendChild(view);

var box = new TextBox();
box.margin = "16 0";
box.width = 300;
box.horizontalAlign = HorizontalAlign.Fill;
stack.appendChild(box);

win.appendChild(stack);
win.show();

Application.run();