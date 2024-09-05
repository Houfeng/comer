using Comer.Runtime.Layouts;
using Comer.Runtime.Properties;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;
using AL = Avalonia.Layout;

namespace Comer.Runtime.Controls;

[JSExport]
public partial class StackView : View {

  public override string Type { get; } = nameof(StackView);

  static StackView() {
    PropertiesManager.UseAccessors<StackView>()
    .Register("Orientation",
     (target) => target.Orientation,
     (target, value) => target.Orientation = (Orientation)value
    ).Register("Spacing",
     (target) => target.Spacing,
     (target, value) => target.Spacing = (double)value
    );
  }

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
