using AC = Avalonia.Controls;
using Microsoft.JavaScript.NodeApi;
using Avalonia;
using Avalonia.Media;

namespace Comer.Gui;

[JSExport]
public class Window : Widget {

  private AC.Window Inner {
    get {
      return (AC.Window)this.Origin;
    }
    set {
      this.Origin = value;
    }
  }

  private View ContentView { get; set; }

  public Window() {
    this.Inner = new AC.Window();
    this.Inner.Width = 500;
    this.Inner.Height = 400;
    this.ContentView = new View();
    this.ContentView.HorizontalAlign = HorizontalAlign.Fill;
    this.ContentView.VerticalAlign = VerticalAlign.Fill;
    this.Inner.Content = this.ContentView.Origin;
  }

  public void Show() {
    this.Inner.Show();
  }

  public void Hide() {
    this.Inner.Hide();
  }

  public void Close() {
    this.Inner.Close();
  }

  public void Activate() {
    this.Inner.Activate();
  }

  public string Title {
    get {
      return this.Inner.Title ?? "";
    }
    set {
      this.Inner.Title = value;
    }
  }

  public double Opacity {
    get {
      return this.Inner.Opacity;
    }
    set {
      this.Inner.Opacity = value;
    }
  }

  public bool Resizable {
    get {
      return this.Inner.CanResize;
    }
    set {
      this.Inner.CanResize = value;
    }
  }

  public double MaxWidth {
    get {
      return this.Inner.MaxWidth;
    }
    set {
      this.Inner.MaxWidth = value;
    }
  }

  public double MaxHeight {
    get {
      return this.Inner.MaxHeight;
    }
    set {
      this.Inner.MaxHeight = value;
    }
  }

  public double MinWidth {
    get {
      return this.Inner.MinWidth;
    }
    set {
      this.Inner.MinWidth = value;
    }
  }

  public double MinHeight {
    get {
      return this.Inner.MinHeight;
    }
    set {
      this.Inner.MinHeight = value;
    }
  }

  public (double, double) Position {
    get {
      var x = this.Inner.Position.X;
      var y = this.Inner.Position.Y;
      return (x, y);
    }
    set {
      var (x, y) = value;
      this.Inner.Position = new PixelPoint((int)x, (int)y);
    }
  }

  public string? Background {
    get {
      if (this.Inner.Background == null) return null;
      return this.Inner.Background.ToString();
    }
    set {
      if (value != null) {
        this.Inner.Background = Brush.Parse(value);
      } else {
        this.Inner.Background = null;
      }
    }
  }

  public void InsertChild(Widget child, Widget? anchor) {
    this.ContentView.InsertChild(child, anchor);
  }

  public void AppendChild(Widget child) {
    this.ContentView.AppendChild(child);
  }

  public void PrependChild(Widget child) {
    this.ContentView.PrependChild(child);
  }

}