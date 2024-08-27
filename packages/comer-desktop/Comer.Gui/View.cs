
using Avalonia.Controls;
using Avalonia.Media;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public class View : Widget {
  private Panel Inner {
    get {
      return (Panel)this.Origin;
    }
    set {
      this.Origin = value;
    }
  }

  public View() {
    this.Inner = new Panel();
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
}
