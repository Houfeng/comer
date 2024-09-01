
using AC = Avalonia.Controls;
using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public partial class View : Control {
  internal protected override AC.Panel xInner { get; } = new AC.Panel();

  public View() {
    xInner.HorizontalAlignment = HorizontalAlignment.Stretch;
    xInner.VerticalAlignment = VerticalAlignment.Stretch;
  }

  public virtual void RemoveChild(Control child) {
    if (xInner.Children.Contains(child.xHost.Raw)) {
      xInner.Children.Remove(child.xHost.Raw);
    }
  }

  public virtual void InsertChild(Control child, Control? anchor) {
    RemoveChild(child);
    if (anchor != null) {
      var anchorIndex = xInner.Children.IndexOf(anchor.xHost.Raw);
      xInner.Children.Insert(anchorIndex + 1, child.xHost.Raw);
    } else {
      xInner.Children.Insert(0, child.xHost.Raw);
    }
  }

  public virtual void AppendChild(Control child) {
    RemoveChild(child);
    var count = xInner.Children.Count;
    xInner.Children.Insert(count, child.xHost.Raw);
  }

  public virtual void PrependChild(Control child) {
    RemoveChild(child);
    xInner.Children.Insert(0, child.xHost.Raw);
  }

}
