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
  internal protected override AC.DockPanel xInner { get; } = new AC.DockPanel();
}

[JSExport]
public partial class DockItem : View {
  public Dock Dock {
    get {
      return (Dock)AC.DockPanel.GetDock(xHost.Raw);
    }
    set {
      AC.DockPanel.SetDock(xHost.Raw, (AC.Dock)value);
    }
  }
}