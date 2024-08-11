
using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public class View
{
  private Gtk.Widget Raw;

  [JSExport(false)]
  public Gtk.Widget Widget
  {
    get
    {
      return this.Raw;
    }
  }

  public View()
  {
    this.Raw = new Gtk.Button();
  }
}