using AC = Avalonia.Controls;
using Microsoft.JavaScript.NodeApi;
using Avalonia;
using Avalonia.Media;
using Comer.Runtime.Layouts;
using Comer.Runtime.Properties;

namespace Comer.Runtime.Controls;

[JSExport(false)]
class FramedWindow : AC.Window, IBounding {
  public AC.Control Raw => this;
  public BoxShadows BoxShadow {
    get { return BoxShadows.Parse(""); }
    set { }
  }
}

[JSExport]
public partial class Window : View {

  public override string Type { get; } = nameof(Window);

  static Window() {
    PropertiesManager.UseAccessors<Window>()
    .Register("X",
     (target) => target.X,
     (target, value) => target.X = (int)value
    ).Register("Y",
     (target) => target.Y,
     (target, value) => target.Y = (int)value
    ).Register("MinWidth",
     (target) => target.MinWidth,
     (target, value) => target.MinWidth = (int)value
    ).Register("MaxWidth",
     (target) => target.MaxWidth,
     (target, value) => target.MaxWidth = (int)value
    ).Register("MinHeight",
     (target) => target.MinHeight,
     (target, value) => target.MinHeight = (int)value
    ).Register("MaxHeight",
     (target) => target.MaxHeight,
     (target, value) => target.MaxHeight = (int)value
    );
  }

  private FramedWindow Win { get; } = new FramedWindow();

  public Window() {
    Win.Content = Bounding;
    SetBounding(Win);
    Win.Width = 480;
    Win.Height = 320;
    Win.Title = "Window";
  }

  public WindowLocation DefaultLocation {
    get {
      return (WindowLocation)Win.WindowStartupLocation;
    }
    set {
      Win.WindowStartupLocation = (AC.WindowStartupLocation)value;
    }
  }

  public void Show() {
    Win.Show();
  }

  public void ShowOnOwner(Window owner) {
    Win.Show((AC.Window)owner.Win.Raw);
  }

  public Task ShowDialog(Window owner) {
    return Win.ShowDialog<object>((AC.Window)owner.Win.Raw);
  }

  public void Hide() {
    Win.Hide();
  }

  public void Close() {
    Win.Close();
  }

  public Vector ClientPointToScreenPoint(Vector vector) {
    var point = new Point(vector.X, vector.Y);
    var sPoint = Win.PointToScreen(point);
    return new Vector(sPoint.X, sPoint.Y);
  }

  public Vector ScreenPointToClientPoint(Vector vector) {
    var point = new PixelPoint((int)vector.X, (int)vector.Y);
    var cPoint = Win.PointToClient(point);
    return new Vector(cPoint.X, cPoint.Y);
  }

  public void Activate() {
    Win.Activate();
  }

  public void Focus() {
    Win.Focus();
  }

  public string Title {
    get {
      return Win.Title ?? "";
    }
    set {
      Win.Title = value;
    }
  }

  public bool Resizable {
    get {
      return Win.CanResize;
    }
    set {
      Win.CanResize = value;
    }
  }

  public bool Focusable {
    get {
      return Win.Focusable;
    }
    set {
      Win.Focusable = value;
    }
  }

  public double MaxWidth {
    get {
      return Win.MaxWidth;
    }
    set {
      Win.MaxWidth = value;
    }
  }

  public double MaxHeight {
    get {
      return Win.MaxHeight;
    }
    set {
      Win.MaxHeight = value;
    }
  }

  public double MinWidth {
    get {
      return Win.MinWidth;
    }
    set {
      Win.MinWidth = value;
    }
  }

  public double MinHeight {
    get {
      return Win.MinHeight;
    }
    set {
      Win.MinHeight = value;
    }
  }

  public int X {
    get {
      return Win.Position.X;
    }
    set {
      Win.Position = new PixelPoint(value, Win.Position.Y);
    }
  }

  public int Y {
    get {
      return Win.Position.Y;
    }
    set {
      Win.Position = new PixelPoint(Win.Position.Y, value);
    }
  }

  public void ShowMenu() {
    var win = new AC.Window();
    var menu = AC.NativeMenu.GetMenu(win) ?? new AC.NativeMenu();
    var item = new AC.NativeMenuItem("测试");
    item.IsVisible = true;
    item.IsEnabled = true;
    item.Click += (_, _) => { };
    menu.Add(item);
    // AC.NativeMenu.SetMenu(Win, menu);
    var bar = new AC.NativeMenuBar();
    win.Content = bar;
    win.Show();
  }

}