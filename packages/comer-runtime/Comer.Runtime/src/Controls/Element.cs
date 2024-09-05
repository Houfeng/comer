
using Avalonia;
using AI = Avalonia.Input;
using Avalonia.Layout;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;
using Avalonia.Input;
using Avalonia.Threading;
using Comer.Runtime.Properties;

namespace Comer.Runtime.Controls;

[JSExport(false)]
public interface IBounding {
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
  CornerRadius CornerRadius { get; set; }
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
public class Boxing : AC.Border, IBounding {
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

public class ComerElementBase {
  internal IEnumerable<string> GetTypeChain() {
    return [];
  }
}

[JSExport]
public partial class ComerElement : ComerElementBase {

  static ComerElement() {
    PropertiesManager.UseAccessors<ComerElement>()
    .Register("Background",
      (target) => target.Background,
      (target, value) => target.Background = (string)value
    ).Register("Width",
     (target) => target.Width,
     (target, value) => target.Width = (double)value
    ).Register("Height",
     (target) => target.Height,
     (target, value) => target.Height = (double)value
    ).Register("HorizontalAlign",
      (target) => target.HorizontalAlign,
      (target, value) => target.HorizontalAlign = (HorizontalAlign)value
    ).Register("VerticalAlign",
      (target) => target.VerticalAlign,
      (target, value) => target.VerticalAlign = (VerticalAlign)value
    );
  }

  public void SetProperty(string name, object value) {
    PropertiesManager.SetValue(this, name, value);
  }

  public object? GetProperty(string name) {
    return PropertiesManager.GetValue(this, name);
  }

  public virtual string Type { get; } = nameof(ComerElement);

  public string? Id { get; set; }

  public IReadOnlyList<string> ClassList { get; private set; } = [];

  public string ClassName {
    get {
      return string.Join(" ", ClassList);
    }
    set {
      ClassList = value.Split(" ").ToArray();
    }
  }

  public ComerElement? Parent { get; set; }

  // -----------------------------------------------------------------------

  internal protected IBounding Bounding { get; private set; } = new Boxing();

  public ComerElement() {
    SetBounding(Bounding);
  }

  internal protected void Invoke(Action? action) {
    if (action == null) return;
#if DEBUG
    Dispatcher.UIThread.Invoke(action);
#else
      Task.Run(action);
#endif
  }

  internal protected virtual void SetBounding(IBounding box) {
    Bounding.Content = null;
    box.PointerEntered += (_, args) => Invoke(OnPointerEnter);
    box.PointerExited += (_, args) => Invoke(OnPointerLeave);
    box.PointerMoved += (_, args) => Invoke(OnPointerMove);
    box.PointerPressed += (_, args) => Invoke(OnPointerDown);
    box.PointerReleased += (_, args) => Invoke(OnPointerUp);
    box.PointerWheelChanged += (_, args) => Invoke(OnWheel);
    Bounding = box;
  }

  public Action? OnPointerEnter { get; set; }
  public Action? OnPointerLeave { get; set; }
  public Action? OnPointerMove { get; set; }
  public Action? OnPointerDown { get; set; }
  public Action? OnPointerUp { get; set; }
  public Action? OnWheel { get; set; }

  public string? Background {
    get {
      if (Bounding.Background == null) return null;
      return Bounding.Background.ToString();
    }
    set {
      if (value != null) {
        Bounding.Background = Brush.Parse(value);
      } else {
        Bounding.Background = null;
      }
    }
  }

  public double Width {
    get {
      return Bounding.Width;
    }
    set {
      Bounding.Width = value;
    }
  }

  public double Height {
    get {
      return Bounding.Height;
    }
    set {
      Bounding.Height = value;
    }
  }

  public HorizontalAlign HorizontalAlign {
    get {
      return (HorizontalAlign)Bounding.HorizontalAlignment;
    }
    set {
      Bounding.HorizontalAlignment = (HorizontalAlignment)value;
      if (value == HorizontalAlign.Fill) {
        Bounding.Width = double.NaN;
      }
    }
  }

  public VerticalAlign VerticalAlign {
    get {
      return (VerticalAlign)Bounding.VerticalAlignment;
    }
    set {
      Bounding.VerticalAlignment = (VerticalAlignment)value;
      if (value == VerticalAlign.Fill) {
        Bounding.Height = double.NaN;
      }
    }
  }

  public string Margin {
    get {
      return Bounding.Margin.ToString();
    }
    set {
      Bounding.Margin = Thickness.Parse(value);
    }
  }

  public string Padding {
    get {
      return Bounding.Padding.ToString();
    }
    set {
      Bounding.Padding = Thickness.Parse(value);
    }
  }

  public string BorderWidth {
    get {
      return Bounding.BorderThickness.ToString();
    }
    set {
      Bounding.BorderThickness = Thickness.Parse(value);
    }
  }

  public string? BorderColor {
    get {
      if (Bounding.BorderBrush == null) return null;
      return Bounding.BorderBrush.ToString();
    }
    set {
      if (value != null) {
        Bounding.BorderBrush = Brush.Parse(value);
      } else {
        Bounding.BorderBrush = null;
      }
    }
  }

  public string? BoxShadow {
    get {
      return Bounding.BoxShadow.ToString();
    }
    set {
      if (value != null) {
        Bounding.BoxShadow = BoxShadows.Parse(value);
      } else {
        Bounding.BoxShadow = BoxShadows.Parse("");
      }
    }
  }

  public string? BorderRadius {
    get {
      return Bounding.CornerRadius.ToString();
    }
    set {
      if (value != null) {
        Bounding.CornerRadius = CornerRadius.Parse(value);
      } else {
        Bounding.CornerRadius = CornerRadius.Parse("");
      }
    }
  }

  public RangeSizing BackgroundSizing {
    get {
      return (RangeSizing)Bounding.BackgroundSizing;
    }
    set {
      Bounding.BackgroundSizing = (BackgroundSizing)value;
    }
  }

  public double Opacity {
    get {
      return Bounding.Opacity;
    }
    set {
      Bounding.Opacity = value;
    }
  }

  public int ZIndex {
    get {
      return Bounding.ZIndex;
    }
    set {
      Bounding.ZIndex = value;
    }
  }

  public string Cursor {
    get {
      if (Bounding.Cursor == null) return "";
      return Bounding.Cursor.ToString();
    }
    set {
      Bounding.Cursor = AI.Cursor.Parse(value ?? "");
    }
  }

}
