using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public class Button : View
{
  [JSExport(false)]
  internal override object GetRaw()
  {
    return this.Raw;
  }

  private Gtk.Button Raw { get; set; }

  public Button()
  {
    this.Raw = new Gtk.Button();
  }

  public string Label
  {
    get
    {
      return this.Raw.Label;
    }
    set
    {
      this.Raw.Label = value;
    }
  }

}