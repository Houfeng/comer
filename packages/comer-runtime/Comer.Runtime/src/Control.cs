
using Avalonia;
using Avalonia.Layout;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;

namespace Comer.Runtime;

[JSExport]
public class Control {

  internal virtual AC.Control __Raw__ { get; set; }
  internal virtual AC.Control? __Content__ {
    get {
      return this.Frame.Child;
    }
    set {
      this.Frame.Child = value;
    }
  }

  private AC.Border Frame { get; set; }

  public Control() {
    this.Frame = new AC.Border();
    this.Frame.HorizontalAlignment = HorizontalAlignment.Center;
    this.Frame.VerticalAlignment = VerticalAlignment.Center;
    this.__Raw__ = this.Frame;
  }

  public virtual string? Background {
    get {
      if (this.Frame.Background == null) return null;
      return this.Frame.Background.ToString();
    }
    set {
      if (value != null) {
        this.Frame.Background = Brush.Parse(value);
      } else {
        this.Frame.Background = null;
      }
    }
  }

  public virtual double Width {
    get {
      return this.Frame.Width;
    }

    set {
      this.Frame.Width = value;
    }
  }

  public virtual double Height {
    get {
      return this.Frame.Height;
    }
    set {
      this.Frame.Height = value;
    }
  }

  public virtual HorizontalAlign HorizontalAlign {
    get {
      return (HorizontalAlign)this.Frame.HorizontalAlignment;
    }
    set {
      this.Frame.HorizontalAlignment = (HorizontalAlignment)value;
    }
  }

  public virtual VerticalAlign VerticalAlign {
    get {
      return (VerticalAlign)this.Frame.VerticalAlignment;
    }
    set {
      this.Frame.VerticalAlignment = (VerticalAlignment)value;
    }
  }

  public virtual string Margin {
    get {
      return this.Frame.Margin.ToString();
    }
    set {
      this.Frame.Margin = Thickness.Parse(value);
    }
  }

  public virtual string Padding {
    get {
      return this.Frame.Padding.ToString();
    }
    set {
      this.Frame.Padding = Thickness.Parse(value);
    }
  }

  public virtual string BorderWidth {
    get {
      return this.Frame.BorderThickness.ToString();
    }
    set {
      this.Frame.BorderThickness = Thickness.Parse(value);
    }
  }

  public virtual string? BorderColor {
    get {
      if (this.Frame.BorderBrush == null) return null;
      return this.Frame.BorderBrush.ToString();
    }
    set {
      if (value != null) {
        this.Frame.BorderBrush = Brush.Parse(value);
      } else {
        this.Frame.BorderBrush = null;
      }
    }
  }

  public virtual string? BoxShadow {
    get {
      return this.Frame.BoxShadow.ToString();
    }
    set {
      if (value != null) {
        this.Frame.BoxShadow = BoxShadows.Parse(value);
      } else {
        this.Frame.BoxShadow = BoxShadows.Parse("");
      }
    }
  }

  public virtual double Opacity {
    get {
      return this.Frame.Opacity;
    }
    set {
      this.Frame.Opacity = value;
    }
  }

}
