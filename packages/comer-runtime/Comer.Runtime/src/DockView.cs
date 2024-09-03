using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;

namespace Comer.Runtime;

[JSExport]
public enum Dock {
  Left,
  Top,
  Right,
  Bottom,
}

[JSExport]
public partial class DockView : View {
  private AC.DockPanel xContainer { get; } = new AC.DockPanel();
  public DockView() : base() {
    xSetContainer(xContainer);
  }
}

[JSExport]
public partial class DockItem : View {
  public DockItem() : base() { }
  public Dock Dock {
    get {
      return (Dock)AC.DockPanel.GetDock(xFrame.Raw);
    }
    set {
      AC.DockPanel.SetDock(xFrame.Raw, (AC.Dock)value);
    }
  }
}