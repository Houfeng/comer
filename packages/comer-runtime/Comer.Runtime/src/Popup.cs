
using Avalonia;
using AC = Avalonia.Controls;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public class Popup : Control {

  Popup() {
    var win = new AC.Window();
    win.Focusable = false;
    win.SystemDecorations = AC.SystemDecorations.None;
  }
}
