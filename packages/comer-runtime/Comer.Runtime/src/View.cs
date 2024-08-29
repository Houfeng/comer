
using Avalonia.Controls;
using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public partial class View : Control {

  private Panel Inner { get; set; }

  public View() {
    Inner = new Panel();
    Inner.HorizontalAlignment = HorizontalAlignment.Stretch;
    Inner.VerticalAlignment = VerticalAlignment.Stretch;
    __Content__ = Inner;
  }

  public virtual void RemoveChild(Control child) {
    if (Inner.Children.Contains(child.__Raw__)) {
      Inner.Children.Remove(child.__Raw__);
    }
  }

  public virtual void InsertChild(Control child, Control? anchor) {
    RemoveChild(child);
    if (anchor != null) {
      var anchorIndex = Inner.Children.IndexOf(anchor.__Raw__);
      Inner.Children.Insert(anchorIndex + 1, child.__Raw__);
    } else {
      Inner.Children.Insert(0, child.__Raw__);
    }
  }

  public virtual void AppendChild(Control child) {
    RemoveChild(child);
    var count = Inner.Children.Count;
    Inner.Children.Insert(count, child.__Raw__);
  }

  public virtual void PrependChild(Control child) {
    RemoveChild(child);
    Inner.Children.Insert(0, child.__Raw__);
  }

}
