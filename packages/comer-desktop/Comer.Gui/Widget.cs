
using Avalonia.Controls;
using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public class Widget {

  [JSExport(false)]
  internal virtual Control Origin { get; set; }

  public Widget() {
    this.Origin = new Control();
  }

  public double Width {
    get {
      return this.Origin.Width;
    }

    set {
      this.Origin.Width = value;
    }
  }

  public double Height {
    get {
      return this.Origin.Height;
    }
    set {
      this.Origin.Height = value;
    }
  }

  public HorizontalAlign HorizontalAlign {
    get {
      return (HorizontalAlign)this.Origin.HorizontalAlignment;
    }
    set {
      this.Origin.HorizontalAlignment = (HorizontalAlignment)value;
    }
  }

  public VerticalAlign VerticalAlign {
    get {
      return (VerticalAlign)this.Origin.VerticalAlignment;
    }
    set {
      this.Origin.VerticalAlignment = (VerticalAlignment)value;
    }
  }

}
