namespace Comer.Runtime;

public static class Program {


  [STAThread]
  public static void Main() {
    Application.Init();

    var win = new Window();
    win.BorderWidth = "16";
    win.BorderColor = "#8af";

    var view = new View();
    view.Background = "#fa8";
    view.Height = 100;
    view.VerticalAlign = VerticalAlign.Top;
    view.HorizontalAlign = HorizontalAlign.Fill;

    win.AppendChild(view);

    var textBox = new TextBox();
    textBox.HorizontalAlign = HorizontalAlign.Fill;
    textBox.VerticalAlign = VerticalAlign.Bottom;
    textBox.MultiLine = true;
    win.AppendChild(textBox);

    var textBox2 = new TextBox();
    textBox2.HorizontalAlign = HorizontalAlign.Fill;
    textBox2.VerticalAlign = VerticalAlign.Center;
    textBox2.MultiLine = true;
    win.AppendChild(textBox2);

    win.Show();

    Application.Start();

  }

}
