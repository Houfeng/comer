const {
  Application, Window, View, TextBox,
  VerticalAlign, HorizontalAlign,
  StackView,
} = require('../');

Application.init();


var win = new Window();
win.title = "Demo";

var stack = new StackView();
stack.spacing = 16;

var view = new View();
view.background = "black";
view.height = 100;
view.verticalAlign = VerticalAlign.Top;
view.horizontalAlign = HorizontalAlign.Fill;
view.onPointerEnter = () => view.BoxShadow = "0 25 30 0 DarkGray";
view.onPointerLeave = () => view.BoxShadow = "";
stack.appendChild(view);

var box = new TextBox();
box.margin = "16 0";
box.width = 300;
box.horizontalAlign = HorizontalAlign.Fill;
stack.appendChild(box);

win.appendChild(stack);
win.show();

Application.run();