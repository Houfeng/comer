using Comer.Runtime.Layouts;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;

namespace Comer.Runtime.Controls;

[JSExport]
public partial class DockView : View {
  private AC.DockPanel Container { get; } = new AC.DockPanel();
  public DockView() : base() {
    SetContainer(Container);
  }
}

[JSExport]
public partial class DockItem : View {
  public DockItem() : base() { }
  public Dock Dock {
    get {
      return (Dock)AC.DockPanel.GetDock(Bounding.Raw);
    }
    set {
      AC.DockPanel.SetDock(Bounding.Raw, (AC.Dock)value);
    }
  }
}