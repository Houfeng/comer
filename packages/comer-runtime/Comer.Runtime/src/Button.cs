using Avalonia;
using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;
using AM = Avalonia.Media;

namespace Comer.Runtime;


[JSExport]
public partial class Button : ComerElement {

  private AC.Button xButton { get; } = new AC.Button();

  public Button() : base() {
    xFrame.Content = xButton;
    xButton.HorizontalAlignment = HorizontalAlignment.Stretch;
    xButton.VerticalAlignment = VerticalAlignment.Stretch;
    xButton.MinHeight = 0;
    xButton.MinWidth = 0;
    xButton.FontSize = 16;
    xButton.Padding = new Thickness(4, 4);
    BindEvents();
  }

  private void BindEvents() {
    xButton.Click += (_, args) => Invoke(OnClick);
    xButton.KeyDown += (_, args) => Invoke(OnKeyDown);
    xButton.KeyUp += (_, args) => Invoke(OnKeyUp);
  }

  public Action? OnClick { get; set; }
  public Action? OnKeyDown { get; set; }
  public Action? OnKeyUp { get; set; }

  public string Text {
    get {
      return xButton?.Content?.ToString() ?? "";
    }
    set {
      xButton.Content = value;
    }
  }
}
