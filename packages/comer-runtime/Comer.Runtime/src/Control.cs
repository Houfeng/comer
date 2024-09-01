
using Avalonia;
using AI = Avalonia.Input;
using Avalonia.Layout;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;
using Avalonia.Input;

namespace Comer.Runtime;

public interface IHostControl {
  AC.Control Raw { get; }
  AC.Classes Classes { get; }
  IBrush? Background { get; set; }
  HorizontalAlignment HorizontalAlignment { get; set; }
  VerticalAlignment VerticalAlignment { get; set; }
  double Width { get; set; }
  double Height { get; set; }
  Thickness Margin { get; set; }
  Thickness Padding { get; set; }
  Thickness BorderThickness { get; set; }
  IBrush? BorderBrush { get; set; }
  BoxShadows BoxShadow { get; set; }
  BackgroundSizing BackgroundSizing { get; set; }
  double Opacity { get; set; }
  int ZIndex { get; set; }

  AI.Cursor? Cursor { get; set; }
  event EventHandler<PointerEventArgs>? PointerEntered;
  event EventHandler<PointerEventArgs>? PointerExited;
  event EventHandler<PointerEventArgs>? PointerMoved;
  event EventHandler<PointerPressedEventArgs>? PointerPressed;
  event EventHandler<PointerReleasedEventArgs>? PointerReleased;
  event EventHandler<PointerWheelEventArgs>? PointerWheelChanged;
}

class HostControl : AC.Border, IHostControl {
  public AC.Control Raw => this;
}

[JSExport]
public partial class Control {
  internal virtual IHostControl xHost { get; } = new HostControl();
  internal protected virtual AC.Control? xInner { get; }

  internal protected virtual void xHostBinding() {
    if (xHost is AC.Border) ((AC.Border)xHost).Child = xInner;
  }

  public Control() {
    xHostBinding();
    EventsBinding();
  }

  internal protected virtual void InvokeEvent(Action? action) {
    if (action != null) Task.Run(action);
  }

  internal protected virtual void EventsBinding() {
    xHost.PointerEntered += (_, args) => InvokeEvent(OnPointerEnter);
    xHost.PointerExited += (_, args) => InvokeEvent(OnPointerLeave);
    xHost.PointerMoved += (_, args) => InvokeEvent(OnPointerMove);
    xHost.PointerPressed += (_, args) => InvokeEvent(OnPointerDown);
    xHost.PointerReleased += (_, args) => InvokeEvent(OnPointerUp);
    xHost.PointerWheelChanged += (_, args) => InvokeEvent(OnWheel);
  }

  public virtual Action? OnPointerEnter { get; set; }
  public virtual Action? OnPointerLeave { get; set; }
  public virtual Action? OnPointerMove { get; set; }
  public virtual Action? OnPointerDown { get; set; }
  public virtual Action? OnPointerUp { get; set; }
  public virtual Action? OnWheel { get; set; }

  public virtual string? Background {
    get {
      if (xHost.Background == null) return null;
      return xHost.Background.ToString();
    }
    set {
      if (value != null) {
        xHost.Background = Brush.Parse(value);
      } else {
        xHost.Background = null;
      }
    }
  }

  public virtual double Width {
    get {
      return xHost.Width;
    }
    set {
      xHost.Width = value;
    }
  }

  public virtual double Height {
    get {
      return xHost.Height;
    }
    set {
      xHost.Height = value;
    }
  }

  public virtual HorizontalAlign HorizontalAlign {
    get {
      return (HorizontalAlign)xHost.HorizontalAlignment;
    }
    set {
      xHost.HorizontalAlignment = (HorizontalAlignment)value;
      if (value == HorizontalAlign.Fill) {
        xHost.Width = double.NaN;
      }
    }
  }

  public virtual VerticalAlign VerticalAlign {
    get {
      return (VerticalAlign)xHost.VerticalAlignment;
    }
    set {
      xHost.VerticalAlignment = (VerticalAlignment)value;
      if (value == VerticalAlign.Fill) {
        xHost.Height = double.NaN;
      }
    }
  }

  public virtual string Margin {
    get {
      return xHost.Margin.ToString();
    }
    set {
      xHost.Margin = Thickness.Parse(value);
    }
  }

  public virtual string Padding {
    get {
      return xHost.Padding.ToString();
    }
    set {
      xHost.Padding = Thickness.Parse(value);
    }
  }

  public virtual string BorderWidth {
    get {
      return xHost.BorderThickness.ToString();
    }
    set {
      xHost.BorderThickness = Thickness.Parse(value);
    }
  }

  public virtual string? BorderColor {
    get {
      if (xHost.BorderBrush == null) return null;
      return xHost.BorderBrush.ToString();
    }
    set {
      if (value != null) {
        xHost.BorderBrush = Brush.Parse(value);
      } else {
        xHost.BorderBrush = null;
      }
    }
  }

  public virtual string? BoxShadow {
    get {
      return xHost.BoxShadow.ToString();
    }
    set {
      if (value != null) {
        xHost.BoxShadow = BoxShadows.Parse(value);
      } else {
        xHost.BoxShadow = BoxShadows.Parse("");
      }
    }
  }

  public virtual RangeSizing BackgroundSizing {
    get {
      return (RangeSizing)xHost.BackgroundSizing;
    }
    set {
      xHost.BackgroundSizing = (BackgroundSizing)value;
    }
  }

  public virtual double Opacity {
    get {
      return xHost.Opacity;
    }
    set {
      xHost.Opacity = value;
    }
  }

  public virtual int ZIndex {
    get {
      return xHost.ZIndex;
    }
    set {
      xHost.ZIndex = value;
    }
  }

  public virtual string Cursor {
    get {
      if (xHost.Cursor == null) return "";
      return xHost.Cursor.ToString();
    }
    set {
      xHost.Cursor = AI.Cursor.Parse(value ?? "");
    }
  }

  public virtual string ClassName {
    get {
      return string.Join(" ", xHost.Classes);
    }
    set {
      xHost.Classes.Clear();
      value.Split(" ").ToList().ForEach(xHost.Classes.Add);
    }
  }

}
