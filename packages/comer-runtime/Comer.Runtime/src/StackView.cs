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

  private AC.StackPanel xContainer { get; } = new AC.StackPanel();

  public StackView() : base() {
    xSetContainer(xContainer);
  }

  public Orientation Orientation {
    get {
      return (Orientation)xContainer.Orientation;
    }
    set {
      xContainer.Orientation = (AL.Orientation)value;
    }
  }

  public double Spacing {
    get {
      return xContainer.Spacing;
    }
    set {
      xContainer.Spacing = value;
    }
  }

}
