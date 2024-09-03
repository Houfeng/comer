using Avalonia;
using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;
using AM = Avalonia.Media;

namespace Comer.Runtime;

[JSExport]
public enum TextWrapping {
  Keep,
  Wrap
}

[JSExport]
public partial class TextBox : ComerElement {

  // Avalonia TextBox，虽然有类似 border 的属性，
  // 因为，设置过一次 Width 再也无法 Stretch 了，以及为了所有组件一致，
  // 所以，也使用 Frame 作为 Wrapper
  private AC.TextBox xBox { get; } = new AC.TextBox();

  public TextBox() : base() {
    xFrame.Content = xBox;
    xBox.HorizontalAlignment = HorizontalAlignment.Stretch;
    xBox.VerticalAlignment = VerticalAlignment.Stretch;
    xBox.MinHeight = 0;
    xBox.MinWidth = 0;
    xBox.FontSize = 16;
    xBox.LineHeight = 22;
    xBox.Padding = new Thickness(4, 4);
    BindEvents();
  }

  private void BindEvents() {
    xBox.TextInput += (_, args) => Invoke(OnInput);
    xBox.TextChanged += (_, args) => Invoke(OnChange);
    xBox.KeyDown += (_, args) => Invoke(OnKeyDown);
    xBox.KeyUp += (_, args) => Invoke(OnKeyUp);
  }

  public virtual Action? OnInput { get; set; }
  public virtual Action? OnChange { get; set; }
  public virtual Action? OnKeyDown { get; set; }
  public virtual Action? OnKeyUp { get; set; }

  public string Value {
    get {
      return xBox.Text ?? "";
    }
    set {
      xBox.Text = value;
    }
  }

  public string Placeholder {
    get {
      return xBox.Watermark ?? "";
    }
    set {
      xBox.Watermark = value;
    }
  }

  public string Mask {
    get {
      return new string([xBox.PasswordChar]);
    }
    set {
      xBox.PasswordChar = value[0];
    }
  }

  public bool MultiLine {
    get {
      return xBox.AcceptsReturn;
    }
    set {
      xBox.AcceptsReturn = value;
    }
  }

  public TextWrapping Wrapping {
    get {
      return (TextWrapping)xBox.TextWrapping;
    }
    set {
      xBox.TextWrapping = (AM.TextWrapping)value;
    }
  }

}
