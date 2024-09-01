const {
  Application, Window, View, TextBox,
  VerticalAlign, HorizontalAlign,
  StackView,
  Orientation
} = require('../');

Application.init();

const win = new Window();
win.title = "Demo";

const stack = new StackView();
stack.verticalAlign = VerticalAlign.Fill;
stack.horizontalAlign = HorizontalAlign.Fill;
stack.background = 'red';
stack.Spacing = 16;
stack.orientation = Orientation.Vertical;

const view = new View();
view.background = "black";
view.height = 100;
view.verticalAlign = VerticalAlign.Top;
view.horizontalAlign = HorizontalAlign.Fill;
view.onPointerEnter = () => {
  view.boxShadow = '0 25 30 0 DarkGray';
};
view.onPointerLeave = () => {
  view.boxShadow = '';
}
stack.insertChild(view);

var box = new TextBox();
box.horizontalAlign = HorizontalAlign.Left;
box.multiLine = true;
box.onChange = () => {
  console.log('Input:', box.value);
}
stack.appendChild(box);

win.appendChild(stack);
win.show();

Application.run();