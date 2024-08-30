
using Avalonia;
using AI = Avalonia.Input;
using Avalonia.Layout;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;

namespace Comer.Runtime;

[JSExport]
public partial class Control : EventTarget {

  internal virtual AC.Control xOuter { get; set; }
  internal virtual AC.Control? xInner {
    get {
      return raw.Child;
    }
    set {
      raw.Child = value;
    }
  }

  private AC.Border raw { get; set; }

  public Control() {
    raw = new AC.Border();
    raw.HorizontalAlignment = HorizontalAlignment.Center;
    raw.VerticalAlignment = VerticalAlignment.Center;
    xOuter = raw;
    InitEvents();
  }

  protected virtual void InitEvents() {
    raw.PointerEntered += (sender, args) =>
      DispatchEvent("PointerPressed", new Event(sender, args));
    raw.PointerExited += (sender, args) =>
      DispatchEvent("PointerExited", new Event(sender, args));
    raw.PointerMoved += (sender, args) =>
      DispatchEvent("PointerMoved", new Event(sender, args));
    raw.PointerPressed += (sender, args) =>
      DispatchEvent("PointerPressed", new Event(sender, args));
    raw.PointerReleased += (sender, args) =>
      DispatchEvent("PointerReleased", new Event(sender, args));
    raw.PointerWheelChanged += (sender, args) =>
      DispatchEvent("PointerWheelChanged", new Event(sender, args));
  }

  public virtual string? Background {
    get {
      if (raw.Background == null) return null;
      return raw.Background.ToString();
    }
    set {
      if (value != null) {
        raw.Background = Brush.Parse(value);
      } else {
        raw.Background = null;
      }
    }
  }

  public virtual double Width {
    get {
      return raw.Width;
    }

    set {
      raw.Width = value;
    }
  }

  public virtual double Height {
    get {
      return raw.Height;
    }
    set {
      raw.Height = value;
    }
  }

  public virtual HorizontalAlign HorizontalAlign {
    get {
      return (HorizontalAlign)raw.HorizontalAlignment;
    }
    set {
      raw.HorizontalAlignment = (HorizontalAlignment)value;
    }
  }

  public virtual VerticalAlign VerticalAlign {
    get {
      return (VerticalAlign)raw.VerticalAlignment;
    }
    set {
      raw.VerticalAlignment = (VerticalAlignment)value;
    }
  }

  public virtual string Margin {
    get {
      return raw.Margin.ToString();
    }
    set {
      raw.Margin = Thickness.Parse(value);
    }
  }

  public virtual string Padding {
    get {
      return raw.Padding.ToString();
    }
    set {
      raw.Padding = Thickness.Parse(value);
    }
  }

  public virtual string BorderWidth {
    get {
      return raw.BorderThickness.ToString();
    }
    set {
      raw.BorderThickness = Thickness.Parse(value);
    }
  }

  public virtual string? BorderColor {
    get {
      if (raw.BorderBrush == null) return null;
      return raw.BorderBrush.ToString();
    }
    set {
      if (value != null) {
        raw.BorderBrush = Brush.Parse(value);
      } else {
        raw.BorderBrush = null;
      }
    }
  }

  public virtual string? BoxShadow {
    get {
      return raw.BoxShadow.ToString();
    }
    set {
      if (value != null) {
        raw.BoxShadow = BoxShadows.Parse(value);
      } else {
        raw.BoxShadow = BoxShadows.Parse("");
      }
    }
  }

  public virtual RangeSizing BackgroundSizing {
    get {
      return (RangeSizing)raw.BackgroundSizing;
    }
    set {
      raw.BackgroundSizing = (BackgroundSizing)value;
    }
  }

  public virtual double Opacity {
    get {
      return raw.Opacity;
    }
    set {
      raw.Opacity = value;
    }
  }

  public virtual string Cursor {
    get {
      if (raw.Cursor == null) return "";
      return raw.Cursor.ToString();
    }
    set {
      raw.Cursor = AI.Cursor.Parse(value ?? "");
    }
  }

}
