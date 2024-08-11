using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public static class Application
{
  public static void Init()
  {
    Gtk.Application.Init();
  }

  public static void Tick()
  {
    Gtk.Application.RunIteration();
  }

  public static void Run()
  {
    Gtk.Application.Run();
  }

}
