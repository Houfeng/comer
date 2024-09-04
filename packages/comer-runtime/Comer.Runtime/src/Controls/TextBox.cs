using Avalonia;
using Avalonia.Layout;
using Comer.Runtime.Layouts;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;
using AM = Avalonia.Media;

namespace Comer.Runtime.Controls;

[JSExport]
public partial class TextBox : ComerElement {

  // Avalonia TextBox，虽然有类似 border 的属性，
  // 因为，设置过一次 Width 再也无法 Stretch 了，以及为了所有组件一致，
  // 所以，也使用 Frame 作为 Wrapper
  private AC.TextBox Box { get; } = new AC.TextBox();

  public TextBox() : base() {
    Bounding.Content = Box;
    Box.HorizontalAlignment = HorizontalAlignment.Stretch;
    Box.VerticalAlignment = VerticalAlignment.Stretch;
    Box.MinHeight = 0;
    Box.MinWidth = 0;
    Box.FontSize = 16;
    Box.LineHeight = 22;
    Box.Padding = new Thickness(4, 4);
    BindEvents();
  }

  private void BindEvents() {
    Box.TextChanged += (_, args) => Invoke(OnChange);
    Box.KeyDown += (_, args) => Invoke(OnKeyDown);
    Box.KeyUp += (_, args) => Invoke(OnKeyUp);
  }

  public Action? OnChange { get; set; }
  public Action? OnKeyDown { get; set; }
  public Action? OnKeyUp { get; set; }

  public string Value {
    get {
      return Box.Text ?? "";
    }
    set {
      Box.Text = value;
    }
  }

  public string Placeholder {
    get {
      return Box.Watermark ?? "";
    }
    set {
      Box.Watermark = value;
    }
  }

  public string Mask {
    get {
      return new string([Box.PasswordChar]);
    }
    set {
      Box.PasswordChar = value[0];
    }
  }

  public bool MultiLine {
    get {
      return Box.AcceptsReturn;
    }
    set {
      Box.AcceptsReturn = value;
    }
  }

  public TextWrapping Wrapping {
    get {
      return (TextWrapping)Box.TextWrapping;
    }
    set {
      Box.TextWrapping = (AM.TextWrapping)value;
    }
  }

}