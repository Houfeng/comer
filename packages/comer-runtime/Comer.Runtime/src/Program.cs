using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public static class Program {


  [STAThread]
  public static void Main() {
    Application.Init();

    var win = new Window();
    win.BorderWidth = "24";
    win.BorderColor = "#8af";

    var view = new View();
    view.Background = "#fa8";
    view.Height = 100;
    view.VerticalAlign = VerticalAlign.Top;
    view.HorizontalAlign = HorizontalAlign.Fill;

    win.AppendChild(view);
    win.Show();

    var win2 = new Window();
    win2.ShowOnOwner(win);

    Application.Start();

  }

}
