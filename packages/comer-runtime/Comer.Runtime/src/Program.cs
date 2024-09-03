﻿namespace Comer.Runtime;

public static class Program {


  [STAThread]
  public static void Main() {
    Application.Init();


    var win = new Window();
    win.Background = "gray";
    win.Title = "Demo";

    var stack = new StackView();
    stack.Spacing = 16;

    var view = new View();
    view.Background = "red";
    view.Height = 100;
    view.VerticalAlign = VerticalAlign.Top;
    view.HorizontalAlign = HorizontalAlign.Fill;
    view.OnPointerEnter = () => view.BoxShadow = "0 25 30 0 DarkGray";
    view.OnPointerLeave = () => view.BoxShadow = "";
    stack.AppendChild(view);

    var box = new TextBox();
    box.Margin = "16 0";
    box.Width = 300;
    box.HorizontalAlign = HorizontalAlign.Fill;
    stack.AppendChild(box);

    var btn = new Button();
    btn.Margin = "16 0";
    btn.Background = "blue";
    btn.Text = "Click";
    stack.AppendChild(btn);

    win.AppendChild(stack);
    win.Show();

    Application.Start();

  }

}
