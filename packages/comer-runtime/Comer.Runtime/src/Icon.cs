using System;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Layout;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public partial class Icon : Control {
  private PathIcon Raw { get; set; }
  public Icon() {
    Raw = new PathIcon();
    xInner = Raw;
    Raw.VerticalAlignment = VerticalAlignment.Center;
    Raw.HorizontalAlignment = HorizontalAlignment.Center;
    Raw.BorderBrush = Brushes.Transparent;
    this.BackgroundSizing = RangeSizing.BorderInner;
  }

  public virtual string Data {
    set {
      Raw.Data = StreamGeometry.Parse(value);
    }
    get {
      if (Raw.Data == null) return "";
      return Raw.Data.ToString() ?? "";
    }
  }

  public virtual string Color {
    get {
      if (Raw.Foreground == null) return "";
      return Raw.Foreground.ToString() ?? "";
    }
    set {
      Raw.Foreground = Brush.Parse(value ?? "");
    }
  }

  public override double Width {
    get {
      return base.Width;
    }
    set {
      base.Width = value;
      Raw.Width = value;
    }
  }

  public override double Height {
    get {
      return base.Height;
    }
    set {
      base.Height = value;
      Raw.Height = value;
    }
  }

  public override string BorderWidth {
    get {
      return base.BorderWidth;
    }
    set {
      base.BorderWidth = value;
      Raw.BorderThickness = Thickness.Parse(value);
    }
  }

  public override RangeSizing BackgroundSizing {
    get {
      return base.BackgroundSizing;
    }
    set {
      base.BackgroundSizing = value;
      Raw.BackgroundSizing = (BackgroundSizing)value;
    }
  }

}
