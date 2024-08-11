using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public class Window : View
{

  private Gtk.Window Raw;

  public Window()
  {
    this.Raw = new Gtk.Window(Gtk.WindowType.Toplevel);
    this.Raw.SetDefaultSize(500, 300);
    this.Raw.SetPosition(Gtk.WindowPosition.Center);
  }

  public string Title
  {
    get
    {
      return this.Raw.Title;
    }
    set
    {
      this.Raw.Title = value;
    }
  }

  public void Show()
  {
    this.Raw.ShowAll();
  }

  public (int, int) Position
  {
    get
    {
      this.Raw.GetPosition(out int x, out int y);
      return (x, y);
    }
    set
    {
      var (x, y) = value;
      this.Move(x, y);
    }
  }

  public void Move(int x, int y)
  {
    this.Raw.Move(x, y);
  }

  public void MoveToCenter()
  {
    this.Raw.SetPosition(Gtk.WindowPosition.Center);
  }

  public (int, int) Size
  {
    get
    {
      this.Raw.GetSizeRequest(out int w, out int h);
      return (w, h);
    }
    set
    {
      var (w, h) = value;
      this.Raw.SetSizeRequest(w, h);
    }
  }

  public void addChild(View view)
  {
    this.Raw.Add(view.Widget);
  }

}