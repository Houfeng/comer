using AC = Avalonia.Controls;
using Microsoft.JavaScript.NodeApi;
using Avalonia;
using Avalonia.Media;
using Avalonia.Layout;

namespace Comer.Runtime;

[JSExport]
public enum WindowDefaultLocation {
  Manual,
  CenterScreen,
  CenterOwner
}

[JSExport]
public partial class Window : View {

  private AC.Window raw { get; set; }

  public Window() {
    xOuter.VerticalAlignment = VerticalAlignment.Stretch;
    xOuter.HorizontalAlignment = HorizontalAlignment.Stretch;
    raw = new AC.Window();
    raw.Content = xOuter;
    xOuter = raw;
    raw.Width = 720;
    raw.Height = 480;
    raw.Title = "Window";
    // this.Inner.SystemDecorations = AC.SystemDecorations.BorderOnly;
    // this.Inner.ExtendClientAreaChromeHints = ExtendClientAreaChromeHints.NoChrome;
  }

  public virtual WindowDefaultLocation DefaultLocation {
    get {
      return (WindowDefaultLocation)raw.WindowStartupLocation;
    }
    set {
      raw.WindowStartupLocation = (AC.WindowStartupLocation)value;
    }
  }

  public virtual void Show() {
    raw.Show();
  }

  public virtual void ShowOnOwner(Window owner) {
    raw.Show(owner.raw);
  }

  public virtual void ShowDialog(Window owner) {
    raw.ShowDialog(owner.raw);
  }

  public virtual void Hide() {
    raw.Hide();
  }

  public virtual void Close() {
    raw.Close();
  }

  public virtual Vector PointToScreen(Vector vector) {
    var point = new Point(vector.X, vector.Y);
    var sPoint = raw.PointToScreen(point);
    return new Vector(sPoint.X, sPoint.Y);
  }

  public virtual Vector PointToClient(Vector vector) {
    var point = new PixelPoint((int)vector.X, (int)vector.Y);
    var cPoint = raw.PointToClient(point);
    return new Vector(cPoint.X, cPoint.Y);
  }

  public virtual void Activate() {
    raw.Activate();
  }

  public virtual void Focus() {
    raw.Focus();
  }

  public virtual string Title {
    get {
      return raw.Title ?? "";
    }
    set {
      raw.Title = value;
    }
  }

  public virtual bool Resizable {
    get {
      return raw.CanResize;
    }
    set {
      raw.CanResize = value;
    }
  }

  public virtual bool Focusable {
    get {
      return raw.Focusable;
    }
    set {
      raw.Focusable = value;
    }
  }

  public virtual double MaxWidth {
    get {
      return raw.MaxWidth;
    }
    set {
      raw.MaxWidth = value;
    }
  }

  public virtual double MaxHeight {
    get {
      return raw.MaxHeight;
    }
    set {
      raw.MaxHeight = value;
    }
  }

  public virtual double MinWidth {
    get {
      return raw.MinWidth;
    }
    set {
      raw.MinWidth = value;
    }
  }

  public virtual double MinHeight {
    get {
      return raw.MinHeight;
    }
    set {
      raw.MinHeight = value;
    }
  }

  public virtual int X {
    get {
      return raw.Position.X;
    }
    set {
      raw.Position = new PixelPoint(value, raw.Position.Y);
    }
  }

  public virtual int Y {
    get {
      return raw.Position.Y;
    }
    set {
      raw.Position = new PixelPoint(raw.Position.Y, value);
    }
  }

  public override double Width {
    get {
      return raw.Width;
    }

    set {
      raw.Width = value;
    }
  }

  public override double Height {
    get {
      return raw.Height;
    }
    set {
      raw.Height = value;
    }
  }

  public override string? Background {
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

  public override double Opacity {
    get {
      return raw.Opacity;
    }
    set {
      raw.Opacity = value;
    }
  }


  public override HorizontalAlign HorizontalAlign {
    get {
      return (HorizontalAlign)raw.HorizontalAlignment;
    }
    set {
      raw.HorizontalAlignment = (HorizontalAlignment)value;
    }
  }

  public override VerticalAlign VerticalAlign {
    get {
      return (VerticalAlign)raw.VerticalAlignment;
    }
    set {
      raw.VerticalAlignment = (VerticalAlignment)value;
    }
  }

}