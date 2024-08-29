
using Avalonia;
using Avalonia.Layout;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;

namespace Comer.Runtime;

[JSExport]
public partial class Control {

  internal virtual AC.Control __Raw__ { get; set; }
  internal virtual AC.Control? __Content__ {
    get {
      return Frame.Child;
    }
    set {
      Frame.Child = value;
    }
  }

  private AC.Border Frame { get; set; }

  public Control() {
    Frame = new AC.Border();
    Frame.HorizontalAlignment = HorizontalAlignment.Center;
    Frame.VerticalAlignment = VerticalAlignment.Center;
    __Raw__ = Frame;
  }

  public virtual string? Background {
    get {
      if (Frame.Background == null) return null;
      return Frame.Background.ToString();
    }
    set {
      if (value != null) {
        Frame.Background = Brush.Parse(value);
      } else {
        Frame.Background = null;
      }
    }
  }

  public virtual double Width {
    get {
      return Frame.Width;
    }

    set {
      Frame.Width = value;
    }
  }

  public virtual double Height {
    get {
      return Frame.Height;
    }
    set {
      Frame.Height = value;
    }
  }

  public virtual HorizontalAlign HorizontalAlign {
    get {
      return (HorizontalAlign)Frame.HorizontalAlignment;
    }
    set {
      Frame.HorizontalAlignment = (HorizontalAlignment)value;
    }
  }

  public virtual VerticalAlign VerticalAlign {
    get {
      return (VerticalAlign)Frame.VerticalAlignment;
    }
    set {
      Frame.VerticalAlignment = (VerticalAlignment)value;
    }
  }

  public virtual string Margin {
    get {
      return Frame.Margin.ToString();
    }
    set {
      Frame.Margin = Thickness.Parse(value);
    }
  }

  public virtual string Padding {
    get {
      return Frame.Padding.ToString();
    }
    set {
      Frame.Padding = Thickness.Parse(value);
    }
  }

  public virtual string BorderWidth {
    get {
      return Frame.BorderThickness.ToString();
    }
    set {
      Frame.BorderThickness = Thickness.Parse(value);
    }
  }

  public virtual string? BorderColor {
    get {
      if (Frame.BorderBrush == null) return null;
      return Frame.BorderBrush.ToString();
    }
    set {
      if (value != null) {
        Frame.BorderBrush = Brush.Parse(value);
      } else {
        Frame.BorderBrush = null;
      }
    }
  }

  public virtual string? BoxShadow {
    get {
      return Frame.BoxShadow.ToString();
    }
    set {
      if (value != null) {
        Frame.BoxShadow = BoxShadows.Parse(value);
      } else {
        Frame.BoxShadow = BoxShadows.Parse("");
      }
    }
  }

  public virtual double Opacity {
    get {
      return Frame.Opacity;
    }
    set {
      Frame.Opacity = value;
    }
  }

}
