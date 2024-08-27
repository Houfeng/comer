using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public static class Program {


  [STAThread]
  public static void Main() {
    Application.Init();

    var win = new Window();
    win.Height = 200;
    win.Width = 200;

    var view = new View();
    view.Background = "blue";
    view.Height = 100;
    view.VerticalAlign = VerticalAlign.Top;
    view.HorizontalAlign = HorizontalAlign.Fill;
    win.AppendChild(view);

    win.Show();

    Application.Start();

  }

}
