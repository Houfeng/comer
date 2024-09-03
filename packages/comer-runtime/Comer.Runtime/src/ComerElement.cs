
using Avalonia;
using AI = Avalonia.Input;
using Avalonia.Layout;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;
using Avalonia.Input;
using Avalonia.Threading;

namespace Comer.Runtime;

[JSExport(false)]
public interface IFrame {
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
  object? Content { get; set; }
  AC.Control Raw { get; }
}

[JSExport(false)]
public class Frame : AC.Border, IFrame {
  public AC.Control Raw => this;
  public object? Content {
    get {
      return Child;
    }
    set {
      if (value == null || !(value is AC.Control)) return;
      Child = (AC.Control)value;
    }
  }
}

[JSExport]
public partial class ComerElement {

  internal IFrame xFrame { get; private set; } = new Frame();

  public ComerElement() {
    xSetFrame(xFrame);
  }

  internal protected void Invoke(Action? action) {
    if (action == null) return;
#if DEBUG
    Dispatcher.UIThread.Invoke(action);
#else
      Task.Run(action);
#endif
  }

  internal protected virtual void xSetFrame(IFrame frame) {
    xFrame.Content = null;
    frame.PointerEntered += (_, args) => Invoke(OnPointerEnter);
    frame.PointerExited += (_, args) => Invoke(OnPointerLeave);
    frame.PointerMoved += (_, args) => Invoke(OnPointerMove);
    frame.PointerPressed += (_, args) => Invoke(OnPointerDown);
    frame.PointerReleased += (_, args) => Invoke(OnPointerUp);
    frame.PointerWheelChanged += (_, args) => Invoke(OnWheel);
    xFrame = frame;
  }

  public Action? OnPointerEnter { get; set; }
  public Action? OnPointerLeave { get; set; }
  public Action? OnPointerMove { get; set; }
  public Action? OnPointerDown { get; set; }
  public Action? OnPointerUp { get; set; }
  public Action? OnWheel { get; set; }

  public string? Background {
    get {
      if (xFrame.Background == null) return null;
      return xFrame.Background.ToString();
    }
    set {
      if (value != null) {
        xFrame.Background = Brush.Parse(value);
      } else {
        xFrame.Background = null;
      }
    }
  }

  public double Width {
    get {
      return xFrame.Width;
    }
    set {
      xFrame.Width = value;
    }
  }

  public double Height {
    get {
      return xFrame.Height;
    }
    set {
      xFrame.Height = value;
    }
  }

  public HorizontalAlign HorizontalAlign {
    get {
      return (HorizontalAlign)xFrame.HorizontalAlignment;
    }
    set {
      xFrame.HorizontalAlignment = (HorizontalAlignment)value;
      if (value == HorizontalAlign.Fill) {
        xFrame.Width = double.NaN;
      }
    }
  }

  public VerticalAlign VerticalAlign {
    get {
      return (VerticalAlign)xFrame.VerticalAlignment;
    }
    set {
      xFrame.VerticalAlignment = (VerticalAlignment)value;
      if (value == VerticalAlign.Fill) {
        xFrame.Height = double.NaN;
      }
    }
  }

  public string Margin {
    get {
      return xFrame.Margin.ToString();
    }
    set {
      xFrame.Margin = Thickness.Parse(value);
    }
  }

  public string Padding {
    get {
      return xFrame.Padding.ToString();
    }
    set {
      xFrame.Padding = Thickness.Parse(value);
    }
  }

  public string BorderWidth {
    get {
      return xFrame.BorderThickness.ToString();
    }
    set {
      xFrame.BorderThickness = Thickness.Parse(value);
    }
  }

  public string? BorderColor {
    get {
      if (xFrame.BorderBrush == null) return null;
      return xFrame.BorderBrush.ToString();
    }
    set {
      if (value != null) {
        xFrame.BorderBrush = Brush.Parse(value);
      } else {
        xFrame.BorderBrush = null;
      }
    }
  }

  public string? BoxShadow {
    get {
      return xFrame.BoxShadow.ToString();
    }
    set {
      if (value != null) {
        xFrame.BoxShadow = BoxShadows.Parse(value);
      } else {
        xFrame.BoxShadow = BoxShadows.Parse("");
      }
    }
  }

  public RangeSizing BackgroundSizing {
    get {
      return (RangeSizing)xFrame.BackgroundSizing;
    }
    set {
      xFrame.BackgroundSizing = (BackgroundSizing)value;
    }
  }

  public double Opacity {
    get {
      return xFrame.Opacity;
    }
    set {
      xFrame.Opacity = value;
    }
  }

  public int ZIndex {
    get {
      return xFrame.ZIndex;
    }
    set {
      xFrame.ZIndex = value;
    }
  }

  public string Cursor {
    get {
      if (xFrame.Cursor == null) return "";
      return xFrame.Cursor.ToString();
    }
    set {
      xFrame.Cursor = AI.Cursor.Parse(value ?? "");
    }
  }

  public string ClassName {
    get {
      return string.Join(" ", xFrame.Classes);
    }
    set {
      xFrame.Classes.Clear();
      value.Split(" ").ToList().ForEach(xFrame.Classes.Add);
    }
  }

}
