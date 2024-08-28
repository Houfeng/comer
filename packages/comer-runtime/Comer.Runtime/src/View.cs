
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public class View : Widget {

  private Border Border {
    get {
      return (Border)this.Origin;
    }
    set {
      this.Origin = value;
    }
  }

  private Panel Inner { get; set; }

  public View() {
    this.Border = new Border();
    this.Inner = new Panel();
    this.Border.Child = this.Inner;
  }

  public void InsertChild(Widget child, Widget? anchor) {
    this.Inner.Children.Remove(child.Origin);
    if (anchor != null) {
      var anchorIndex = this.Inner.Children.IndexOf(anchor.Origin);
      this.Inner.Children.Insert(anchorIndex + 1, child.Origin);
    } else {
      this.Inner.Children.Insert(0, child.Origin);
    }
  }

  public void AppendChild(Widget child) {
    this.Inner.Children.Remove(child.Origin);
    var count = this.Inner.Children.Count;
    this.Inner.Children.Insert(count, child.Origin);
  }

  public void PrependChild(Widget child) {
    this.Inner.Children.Remove(child.Origin);
    this.Inner.Children.Insert(0, child.Origin);
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

  public (double, double, double, double) BorderWidth {
    get {
      var t = this.Border.BorderThickness.Top;
      var r = this.Border.BorderThickness.Right;
      var b = this.Border.BorderThickness.Bottom;
      var l = this.Border.BorderThickness.Left;
      return (t, r, b, l);
    }
    set {
      var (t, r, b, l) = value;
      this.Border.BorderThickness = new Thickness(l, t, r, b);
    }
  }

  public string? BorderColor {
    get {
      if (this.Border.BorderBrush == null) return null;
      return this.Border.BorderBrush.ToString();
    }
    set {
      if (value != null) {
        this.Border.BorderBrush = Brush.Parse(value);
      } else {
        this.Border.BorderBrush = null;
      }
    }
  }

  public string? BoxShadow {
    get {
      return this.Border.BoxShadow.ToString();
    }
    set {
      if (value != null) {
        this.Border.BoxShadow = BoxShadows.Parse(value);
      } else {
        this.Border.BoxShadow = BoxShadows.Parse("");
      }
    }
  }

}
