const { resolve } = require('path');
const { Application, WidgetManager } = require('../bin/node/Comer.Gui');

process.chdir(resolve(__dirname, '../bin/node/'));

var handle = WidgetManager.create("window");
console.log('::handle', handle);
WidgetManager.invoke(handle, 'Show', []);

function loop() {
  Application.tick();
  setImmediate(loop);
}
loop();