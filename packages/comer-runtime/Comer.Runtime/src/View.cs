
using Avalonia.Controls;
using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public partial class View : Control {

  private Panel raw { get; set; }

  public View() {
    raw = new Panel();
    raw.HorizontalAlignment = HorizontalAlignment.Stretch;
    raw.VerticalAlignment = VerticalAlignment.Stretch;
    xInner = raw;
  }

  public virtual void RemoveChild(Control child) {
    if (raw.Children.Contains(child.xOuter)) {
      raw.Children.Remove(child.xOuter);
    }
  }

  public virtual void InsertChild(Control child, Control? anchor) {
    RemoveChild(child);
    if (anchor != null) {
      var anchorIndex = raw.Children.IndexOf(anchor.xOuter);
      raw.Children.Insert(anchorIndex + 1, child.xOuter);
    } else {
      raw.Children.Insert(0, child.xOuter);
    }
  }

  public virtual void AppendChild(Control child) {
    RemoveChild(child);
    var count = raw.Children.Count;
    raw.Children.Insert(count, child.xOuter);
  }

  public virtual void PrependChild(Control child) {
    RemoveChild(child);
    raw.Children.Insert(0, child.xOuter);
  }

}
