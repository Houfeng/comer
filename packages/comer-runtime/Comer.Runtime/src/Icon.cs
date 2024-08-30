using System;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Layout;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public partial class Icon : Control {
  private PathIcon Inner { get; set; }
  public Icon() {
    Inner = new PathIcon();
    __Inner__ = Inner;
    Inner.VerticalAlignment = VerticalAlignment.Center;
    Inner.HorizontalAlignment = HorizontalAlignment.Center;
    Inner.BorderBrush = Brushes.Transparent;
    this.BackgroundSizing = RangeSizing.BorderInner;
  }

  public virtual string Data {
    set {
      Inner.Data = StreamGeometry.Parse(value);
    }
    get {
      if (Inner.Data == null) return "";
      return Inner.Data.ToString() ?? "";
    }
  }

  public virtual string Color {
    get {
      if (Inner.Foreground == null) return "";
      return Inner.Foreground.ToString() ?? "";
    }
    set {
      Inner.Foreground = Brush.Parse(value ?? "");
    }
  }

  public override double Width {
    get {
      return base.Width;
    }
    set {
      base.Width = value;
      Inner.Width = value;
    }
  }

  public override double Height {
    get {
      return base.Height;
    }
    set {
      base.Height = value;
      Inner.Height = value;
    }
  }

  public override string BorderWidth {
    get {
      return base.BorderWidth;
    }
    set {
      base.BorderWidth = value;
      Inner.BorderThickness = Thickness.Parse(value);
    }
  }

  public override RangeSizing BackgroundSizing {
    get {
      return base.BackgroundSizing;
    }
    set {
      base.BackgroundSizing = value;
      Inner.BackgroundSizing = (BackgroundSizing)value;
    }
  }

}
