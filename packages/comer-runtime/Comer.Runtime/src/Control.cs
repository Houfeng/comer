
using Avalonia;
using AI = Avalonia.Input;
using Avalonia.Layout;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;

namespace Comer.Runtime;

[JSExport]
public partial class Control : EventTarget {

  internal virtual AC.Control __Outer__ { get; set; }
  internal virtual AC.Control? __Inner__ {
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
    __Outer__ = Frame;
    InitEvents();
  }

  protected void InitEvents() {
    Frame.PointerEntered += (sender, args) =>
      DispatchEvent("PointerPressed", new Event(sender, args));
    Frame.PointerExited += (sender, args) =>
      DispatchEvent("PointerExited", new Event(sender, args));
    Frame.PointerMoved += (sender, args) =>
      DispatchEvent("PointerMoved", new Event(sender, args));
    Frame.PointerPressed += (sender, args) =>
      DispatchEvent("PointerPressed", new Event(sender, args));
    Frame.PointerReleased += (sender, args) =>
      DispatchEvent("PointerReleased", new Event(sender, args));
    Frame.PointerWheelChanged += (sender, args) =>
      DispatchEvent("PointerWheelChanged", new Event(sender, args));
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

  public virtual RangeSizing BackgroundSizing {
    get {
      return (RangeSizing)Frame.BackgroundSizing;
    }
    set {
      Frame.BackgroundSizing = (BackgroundSizing)value;
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

  public virtual string Cursor {
    get {
      if (Frame.Cursor == null) return "";
      return Frame.Cursor.ToString();
    }
    set {
      Frame.Cursor = AI.Cursor.Parse(value ?? "");
    }
  }

}