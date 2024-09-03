
using AC = Avalonia.Controls;
using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public partial class View : ComerElement {
  private AC.Panel xContainer { get; set; } = new AC.Panel();

  internal protected void xSetContainer(AC.Panel container) {
    xFrame.Content = container;
    xContainer = container;
  }

  public View() : base() {
    xSetContainer(xContainer);
    xContainer.HorizontalAlignment = HorizontalAlignment.Stretch;
    xContainer.VerticalAlignment = VerticalAlignment.Stretch;
  }

  public void RemoveChild(ComerElement child) {
    if (xContainer.Children.Contains(child.xFrame.Raw)) {
      xContainer.Children.Remove(child.xFrame.Raw);
    }
  }

  public void InsertChild(ComerElement child, ComerElement? anchor) {
    RemoveChild(child);
    if (anchor != null) {
      var anchorIndex = xContainer.Children.IndexOf(anchor.xFrame.Raw);
      xContainer.Children.Insert(anchorIndex + 1, child.xFrame.Raw);
    } else {
      xContainer.Children.Insert(0, child.xFrame.Raw);
    }
  }

  public void AppendChild(ComerElement child) {
    RemoveChild(child);
    var count = xContainer.Children.Count;
    xContainer.Children.Insert(count, child.xFrame.Raw);
  }

  public void PrependChild(ComerElement child) {
    RemoveChild(child);
    xContainer.Children.Insert(0, child.xFrame.Raw);
  }

}
