const { Application, Window, Button } = require('../bin/Comer.Gui');

Application.init();

const win = new Window();
win.title = 'Hello Comer';

const btn = new Button();
btn.label = 'click';
win.addChild(btn);

win.show();

function loop() {
  Application.tick();
  setImmediate(loop);
}
loop();
