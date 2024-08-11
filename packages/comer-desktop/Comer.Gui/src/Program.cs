namespace Comer.Gui;

public static class DebugProgram
{

  [STAThread]
  public static void Main(string[] args)
  {
    Application.Init();

    var win = new Window();
    var btn = new Button();
    win.addChild(btn);

    win.Show();

    Application.Run();
  }

}
