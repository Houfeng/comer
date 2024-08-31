using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;
using AL = Avalonia.Layout;

namespace Comer.Runtime;

public enum Orientation {
  Horizontal,
  Vertical
}

[JSExport]
public partial class StackView : View {
  protected override AC.StackPanel xInner { get; } = new AC.StackPanel();

  public Orientation Orientation {
    get {
      return (Orientation)xInner.Orientation;
    }
    set {
      xInner.Orientation = (AL.Orientation)value;
    }
  }

  public double Spacing {
    get {
      return xInner.Spacing;
    }
    set {
      xInner.Spacing = value;
    }
  }

}
