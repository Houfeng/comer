using AC = Avalonia.Controls;
using Microsoft.JavaScript.NodeApi;
using Avalonia;
using Avalonia.Media;
using Avalonia.Input;

namespace Comer.Runtime;

public interface IHostWindow : IHostControl {
  string? Title { get; set; }
  object? Content { get; set; }
  AC.WindowStartupLocation WindowStartupLocation { get; set; }
  PixelPoint Position { get; set; }
  void Show();
  void Show(AC.Window owner);
  void Hide();
  void Close();
  void Activate();
  bool Focus(
    NavigationMethod method = NavigationMethod.Unspecified,
    KeyModifiers keyModifiers = KeyModifiers.None
  );
  bool CanResize { get; set; }
  bool Focusable { get; set; }
  Task<TResult> ShowDialog<TResult>(AC.Window owner);
  PixelPoint ClientPointToScreenPoint(Point point);
  Point ScreenPointToClientPoint(PixelPoint point);
  double MinWidth { get; set; }
  double MaxWidth { get; set; }
  double MinHeight { get; set; }
  double MaxHeight { get; set; }
}

class HostWindow : AC.Window, IHostWindow {
  public AC.Control Raw => this;

  public BoxShadows BoxShadow {
    get { return BoxShadows.Parse(""); }
    set { }
  }
  public PixelPoint ClientPointToScreenPoint(Point point) {
    return this.PointToScreen(point);
  }
  public Point ScreenPointToClientPoint(PixelPoint point) {
    return this.PointToClient(point);
  }
}

[JSExport]
public enum WindowDefaultLocation {
  Manual,
  CenterScreen,
  CenterOwner
}

[JSExport]
public partial class Window : View {

  internal override IHostWindow xHost { get; } = new HostWindow();

  protected override void xHostBinding() {
    ((HostWindow)xHost).Content = xInner;
  }

  public Window() {
    xHost.Width = 720;
    xHost.Height = 480;
    xHost.Title = "Window";
  }

  public virtual WindowDefaultLocation DefaultLocation {
    get {
      return (WindowDefaultLocation)xHost.WindowStartupLocation;
    }
    set {
      xHost.WindowStartupLocation = (AC.WindowStartupLocation)value;
    }
  }

  public virtual void Show() {
    xHost.Show();
  }

  public virtual void ShowOnOwner(Window owner) {
    xHost.Show((AC.Window)owner.xHost.Raw);
  }

  public virtual Task ShowDialog(Window owner) {
    return xHost.ShowDialog<object>((AC.Window)owner.xHost.Raw);
  }

  public virtual void Hide() {
    xHost.Hide();
  }

  public virtual void Close() {
    xHost.Close();
  }

  public virtual Vector ClientPointToScreenPoint(Vector vector) {
    var point = new Point(vector.X, vector.Y);
    var sPoint = xHost.ClientPointToScreenPoint(point);
    return new Vector(sPoint.X, sPoint.Y);
  }

  public virtual Vector ScreenPointToClientPoint(Vector vector) {
    var point = new PixelPoint((int)vector.X, (int)vector.Y);
    var cPoint = xHost.ScreenPointToClientPoint(point);
    return new Vector(cPoint.X, cPoint.Y);
  }

  public virtual void Activate() {
    xHost.Activate();
  }

  public virtual void Focus() {
    xHost.Focus();
  }

  public virtual string Title {
    get {
      return xHost.Title ?? "";
    }
    set {
      xHost.Title = value;
    }
  }

  public virtual bool Resizable {
    get {
      return xHost.CanResize;
    }
    set {
      xHost.CanResize = value;
    }
  }

  public virtual bool Focusable {
    get {
      return xHost.Focusable;
    }
    set {
      xHost.Focusable = value;
    }
  }

  public virtual double MaxWidth {
    get {
      return xHost.MaxWidth;
    }
    set {
      xHost.MaxWidth = value;
    }
  }

  public virtual double MaxHeight {
    get {
      return xHost.MaxHeight;
    }
    set {
      xHost.MaxHeight = value;
    }
  }

  public virtual double MinWidth {
    get {
      return xHost.MinWidth;
    }
    set {
      xHost.MinWidth = value;
    }
  }

  public virtual double MinHeight {
    get {
      return xHost.MinHeight;
    }
    set {
      xHost.MinHeight = value;
    }
  }

  public virtual int X {
    get {
      return xHost.Position.X;
    }
    set {
      xHost.Position = new PixelPoint(value, xHost.Position.Y);
    }
  }

  public virtual int Y {
    get {
      return xHost.Position.Y;
    }
    set {
      xHost.Position = new PixelPoint(xHost.Position.Y, value);
    }
  }

}