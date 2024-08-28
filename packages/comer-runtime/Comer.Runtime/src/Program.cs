using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public static class Program {


  [STAThread]
  public static void Main() {
    Application.Init();

    var win = new Window();
    win.Background = "#cdf";
    win.BorderWidth = "24";
    win.BorderColor = "black";

    var view = new View();
    view.Background = "blue";
    view.Height = 100;
    view.VerticalAlign = VerticalAlign.Top;
    view.HorizontalAlign = HorizontalAlign.Fill;
    view.BoxShadow = "5 5 10 0 DarkGray";

    win.AppendChild(view);

    win.Show();

    Application.Start();

  }

}
