using Avalonia.Controls;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime.Controls;

public partial class Menu {
  public static void SetMenu(Avalonia.Application app) {
    var oldMenu = NativeMenu.GetMenu(app);
    NativeMenu menu = oldMenu == null ? new NativeMenu() : oldMenu;
    NativeMenuItem item = new NativeMenuItem();
    item.Header = "&Test";
    item.IsEnabled = true;
    item.IsVisible = true;
    item.Click += (_, e) => {
      Console.WriteLine("Click");
    };
    menu.Add(item);
    NativeMenu.SetMenu(app, menu);
  }
}
