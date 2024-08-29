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

  private AC.Window Raw { get; set; }

  public Window() {
    __Raw__.VerticalAlignment = VerticalAlignment.Stretch;
    __Raw__.HorizontalAlignment = HorizontalAlignment.Stretch;
    Raw = new AC.Window();
    Raw.Content = __Raw__;
    __Raw__ = Raw;
    Raw.Width = 720;
    Raw.Height = 480;
    Raw.Title = "Window";
    // this.Inner.SystemDecorations = AC.SystemDecorations.BorderOnly;
    // this.Inner.ExtendClientAreaChromeHints = ExtendClientAreaChromeHints.NoChrome;
  }

  public virtual WindowDefaultLocation DefaultLocation {
    get {
      return (WindowDefaultLocation)Raw.WindowStartupLocation;
    }
    set {
      Raw.WindowStartupLocation = (AC.WindowStartupLocation)value;
    }
  }

  public virtual void Show() {
    Raw.Show();
  }

  public virtual void ShowOnOwner(Window owner) {
    Raw.Show(owner.Raw);
  }

  public virtual void ShowDialog(Window owner) {
    Raw.ShowDialog(owner.Raw);
  }

  public virtual void Hide() {
    Raw.Hide();
  }

  public virtual void Close() {
    Raw.Close();
  }

  public virtual Vector PointToScreen(Vector vector) {
    var point = new Point(vector.X, vector.Y);
    var sPoint = Raw.PointToScreen(point);
    return new Vector(sPoint.X, sPoint.Y);
  }

  public virtual Vector PointToClient(Vector vector) {
    var point = new PixelPoint((int)vector.X, (int)vector.Y);
    var cPoint = Raw.PointToClient(point);
    return new Vector(cPoint.X, cPoint.Y);
  }

  public virtual void Activate() {
    Raw.Activate();
  }

  public virtual void Focus() {
    Raw.Focus();
  }

  public virtual string Title {
    get {
      return Raw.Title ?? "";
    }
    set {
      Raw.Title = value;
    }
  }

  public virtual bool Resizable {
    get {
      return Raw.CanResize;
    }
    set {
      Raw.CanResize = value;
    }
  }

  public virtual bool Focusable {
    get {
      return Raw.Focusable;
    }
    set {
      Raw.Focusable = value;
    }
  }

  public virtual double MaxWidth {
    get {
      return Raw.MaxWidth;
    }
    set {
      Raw.MaxWidth = value;
    }
  }

  public virtual double MaxHeight {
    get {
      return Raw.MaxHeight;
    }
    set {
      Raw.MaxHeight = value;
    }
  }

  public virtual double MinWidth {
    get {
      return Raw.MinWidth;
    }
    set {
      Raw.MinWidth = value;
    }
  }

  public virtual double MinHeight {
    get {
      return Raw.MinHeight;
    }
    set {
      Raw.MinHeight = value;
    }
  }

  public virtual int X {
    get {
      return Raw.Position.X;
    }
    set {
      Raw.Position = new PixelPoint(value, Raw.Position.Y);
    }
  }

  public virtual int Y {
    get {
      return Raw.Position.Y;
    }
    set {
      Raw.Position = new PixelPoint(Raw.Position.Y, value);
    }
  }

  public override double Width {
    get {
      return Raw.Width;
    }

    set {
      Raw.Width = value;
    }
  }

  public override double Height {
    get {
      return Raw.Height;
    }
    set {
      Raw.Height = value;
    }
  }

  public override string? Background {
    get {
      if (Raw.Background == null) return null;
      return Raw.Background.ToString();
    }
    set {
      if (value != null) {
        Raw.Background = Brush.Parse(value);
      } else {
        Raw.Background = null;
      }
    }
  }

  public override double Opacity {
    get {
      return Raw.Opacity;
    }
    set {
      Raw.Opacity = value;
    }
  }


  public override HorizontalAlign HorizontalAlign {
    get {
      return (HorizontalAlign)Raw.HorizontalAlignment;
    }
    set {
      Raw.HorizontalAlignment = (HorizontalAlignment)value;
    }
  }

  public override VerticalAlign VerticalAlign {
    get {
      return (VerticalAlign)Raw.VerticalAlignment;
    }
    set {
      Raw.VerticalAlignment = (VerticalAlignment)value;
    }
  }

}