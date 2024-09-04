using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;
using AL = Avalonia.Layout;

namespace Comer.Runtime;

[JSExport]
public enum Orientation {
  Horizontal,
  Vertical
}

[JSExport]
public partial class StackView : View {

  private AC.StackPanel Panel { get; } = new AC.StackPanel();

  public StackView() : base() {
    SetContainer(Panel);
  }

  public Orientation Orientation {
    get {
      return (Orientation)Panel.Orientation;
    }
    set {
      Panel.Orientation = (AL.Orientation)value;
    }
  }

  public double Spacing {
    get {
      return Panel.Spacing;
    }
    set {
      Panel.Spacing = value;
    }
  }

}
