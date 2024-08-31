namespace Comer.Runtime;

public static class Program {


  [STAThread]
  public static void Main() {
    Application.Init();


    var win = new Window();

    win.Title = "Demo";

    var view = new View();
    view.Background = "black";
    view.Height = 100;
    view.VerticalAlign = VerticalAlign.Top;
    view.HorizontalAlign = HorizontalAlign.Fill;
    view.BorderColor = "red";
    view.BorderWidth = "10";
    view.BoxShadow = "0 25 30 0 DarkGray";

    var box = new TextBox();
    box.HorizontalAlign = HorizontalAlign.Left;
    box.MultiLine = true;
    view.AppendChild(box);

    win.AppendChild(view);
    win.Show();

    Application.Start();

  }

}
