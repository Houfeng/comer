using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public class Button : View
{
  private Gtk.Button Raw;

  public Button()
  {
    this.Raw = new Gtk.Button();
    this.Raw.Label = "Button";
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