using Avalonia;
using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;
using AM = Avalonia.Media;

namespace Comer.Runtime.Controls;


[JSExport]
public partial class Button : ComerElement {

  public override string Type { get; } = nameof(Button);

  private AC.TextBlock Btn { get; } = new();

  public Button() : base() {
    Bounding.Content = Btn;
    Btn.HorizontalAlignment = HorizontalAlignment.Center;
    Btn.VerticalAlignment = VerticalAlignment.Center;
    Btn.MinHeight = 0;
    Btn.MinWidth = 0;
    Btn.FontSize = 16;
    Btn.Margin = new Thickness(0);
    Btn.Padding = new Thickness(0);
    // Btn.BorderThickness = new Thickness(0);
    // Btn.BorderBrush = AM.Brushes.Transparent;
    Btn.Background = AM.Brushes.Transparent;
    Btn.Foreground = AM.Brushes.White;
    Padding = "4 6";
    BorderWidth = "1";
    BorderRadius = "8";
    Background = "#0055ff";
    BorderColor = "#0055ff";
    BindEvents();
  }

  private void BindEvents() {
    // Btn.Click += (_, args) => Invoke(OnClick);
    Btn.KeyDown += (_, args) => Invoke(OnKeyDown);
    Btn.KeyUp += (_, args) => Invoke(OnKeyUp);
  }

  public Action? OnClick { get; set; }
  public Action? OnKeyDown { get; set; }
  public Action? OnKeyUp { get; set; }

  public string Text {
    get {
      return Btn?.Text?.ToString() ?? "";
    }
    set {
      Btn.Text = value;
    }
  }
}
