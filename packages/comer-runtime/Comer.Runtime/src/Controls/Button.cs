using Avalonia;
using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;

namespace Comer.Runtime.Controls;


[JSExport]
public partial class Button : ComerElement {

  private AC.Button Btn { get; } = new AC.Button();

  public Button() : base() {
    Bounding.Content = Btn;
    Btn.HorizontalAlignment = HorizontalAlignment.Stretch;
    Btn.VerticalAlignment = VerticalAlignment.Stretch;
    Btn.MinHeight = 0;
    Btn.MinWidth = 0;
    Btn.FontSize = 16;
    Btn.Padding = new Thickness(4, 4);
    BindEvents();
  }

  private void BindEvents() {
    Btn.Click += (_, args) => Invoke(OnClick);
    Btn.KeyDown += (_, args) => Invoke(OnKeyDown);
    Btn.KeyUp += (_, args) => Invoke(OnKeyUp);
  }

  public Action? OnClick { get; set; }
  public Action? OnKeyDown { get; set; }
  public Action? OnKeyUp { get; set; }

  public string Text {
    get {
      return Btn?.Content?.ToString() ?? "";
    }
    set {
      Btn.Content = value;
    }
  }
}
