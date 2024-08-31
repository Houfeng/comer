using Avalonia.Controls;
using Avalonia.Layout;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public partial class Icon : Control {
  protected override PathIcon xInner { get; } = new PathIcon();

  public Icon() {
    xInner.VerticalAlignment = VerticalAlignment.Center;
    xInner.HorizontalAlignment = HorizontalAlignment.Center;
    xInner.BorderBrush = Brushes.Transparent;
    this.BackgroundSizing = RangeSizing.BorderInner;
  }

  public virtual string Data {
    set {
      xInner.Data = StreamGeometry.Parse(value);
    }
    get {
      if (xInner.Data == null) return "";
      return xInner.Data.ToString() ?? "";
    }
  }

  public virtual string Color {
    get {
      if (xInner.Foreground == null) return "";
      return xInner.Foreground.ToString() ?? "";
    }
    set {
      xInner.Foreground = Brush.Parse(value ?? "");
    }
  }

}
