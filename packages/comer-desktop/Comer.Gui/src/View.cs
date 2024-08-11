
using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public class View
{
  private Gtk.Widget Raw { get; set; }

  [JSExport(false)]
  internal virtual object GetRaw()
  {
    return this.Raw;
  }

  public View()
  {
    this.Raw = new Gtk.Button();
  }
}