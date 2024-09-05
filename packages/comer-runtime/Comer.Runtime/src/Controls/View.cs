
using AC = Avalonia.Controls;
using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime.Controls;

[JSExport]
public partial class View : ComerElement {
  public override string Type { get; } = nameof(View);

  private AC.Panel Panel { get; set; } = new AC.Panel();

  internal protected void SetContainer(AC.Panel panel) {
    Bounding.Content = panel;
    Panel = panel;
  }

  public View() : base() {
    SetContainer(Panel);
    Panel.HorizontalAlignment = HorizontalAlignment.Stretch;
    Panel.VerticalAlignment = VerticalAlignment.Stretch;
  }

  public void RemoveChild(ComerElement child) {
    var raw = (AC.Control)child.Bounding;
    if (Panel.Children.Contains(raw)) {
      Panel.Children.Remove(child.Bounding.Raw);
      child.Parent = null;
    }
  }

  public void InsertChild(ComerElement child, ComerElement? anchor) {
    RemoveChild(child);
    if (anchor != null) {
      var anchorIndex = Panel.Children.IndexOf(anchor.Bounding.Raw);
      Panel.Children.Insert(anchorIndex + 1, child.Bounding.Raw);
    } else {
      Panel.Children.Insert(0, child.Bounding.Raw);
    }
    child.Parent = this;
  }

  public void AppendChild(ComerElement child) {
    RemoveChild(child);
    var count = Panel.Children.Count;
    Panel.Children.Insert(count, child.Bounding.Raw);
    child.Parent = this;
  }

  public void PrependChild(ComerElement child) {
    RemoveChild(child);
    Panel.Children.Insert(0, child.Bounding.Raw);
    child.Parent = this;
  }

}
