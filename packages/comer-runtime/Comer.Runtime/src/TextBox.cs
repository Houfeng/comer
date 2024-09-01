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
public partial class TextBox : Control {

  // Avalonia TextBox，虽然有类似 border 的属性，
  // 因为，设置过一次 Width 再也无法 Stretch 了，以及为了所有组件一致，
  // 所以，也使用 xHost Wrapper (Border)
  internal protected override AC.TextBox xInner { get; } = new AC.TextBox();

  public TextBox() {
    xInner.HorizontalAlignment = HorizontalAlignment.Stretch;
    xInner.VerticalAlignment = VerticalAlignment.Stretch;
    xInner.MinHeight = 0;
    xInner.MinWidth = 0;
    xInner.FontSize = 16;
    xInner.LineHeight = 22;
    xInner.Padding = new Thickness(4, 4);
  }

  internal protected override void EventsBinding() {
    base.EventsBinding();
    xInner.TextInput += (_, args) => InvokeEvent(OnInput);
    xInner.TextChanged += (_, args) => InvokeEvent(OnChange);
    xInner.KeyDown += (_, args) => InvokeEvent(OnKeyDown);
    xInner.KeyUp += (_, args) => InvokeEvent(OnKeyUp);
  }

  public virtual Action? OnInput { get; set; }
  public virtual Action? OnChange { get; set; }
  public virtual Action? OnKeyDown { get; set; }
  public virtual Action? OnKeyUp { get; set; }

  public string Value {
    get {
      return xInner.Text ?? "";
    }
    set {
      xInner.Text = value;
    }
  }

  public string Placeholder {
    get {
      return xInner.Watermark ?? "";
    }
    set {
      xInner.Watermark = value;
    }
  }

  public string Mask {
    get {
      return new string([xInner.PasswordChar]);
    }
    set {
      xInner.PasswordChar = value[0];
    }
  }

  public bool MultiLine {
    get {
      return xInner.AcceptsReturn;
    }
    set {
      xInner.AcceptsReturn = value;
    }
  }

  public TextWrapping Wrapping {
    get {
      return (TextWrapping)xInner.TextWrapping;
    }
    set {
      xInner.TextWrapping = (AM.TextWrapping)value;
    }
  }

}
