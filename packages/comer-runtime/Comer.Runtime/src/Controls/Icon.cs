using Avalonia.Controls;
using Avalonia.Layout;
using Avalonia.Media;
using Comer.Runtime.Properties;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime.Controls;

[JSExport]
public partial class Icon : ComerElement {

  public override string Type { get; } = nameof(Icon);

  static Icon() {
    PropertiesManager.UseAccessors<Icon>()
    .Register("Color",
     (target) => target.Color,
     (target, value) => target.Color = (string)value
    );
  }

  private PathIcon xIcon { get; } = new PathIcon();

  public Icon() {
    Bounding.Content = xIcon;
    xIcon.VerticalAlignment = VerticalAlignment.Center;
    xIcon.HorizontalAlignment = HorizontalAlignment.Center;
    xIcon.BorderBrush = Brushes.Transparent;
    BackgroundSizing = RangeSizing.BorderInner;
  }

  public string Data {
    set {
      xIcon.Data = StreamGeometry.Parse(value);
    }
    get {
      if (xIcon.Data == null) return "";
      return xIcon.Data.ToString() ?? "";
    }
  }

  public string Color {
    get {
      if (xIcon.Foreground == null) return "";
      return xIcon.Foreground.ToString() ?? "";
    }
    set {
      xIcon.Foreground = Brush.Parse(value ?? "");
    }
  }

}
