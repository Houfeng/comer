using System;
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
  protected override AC.TextBox xInner { get; } = new AC.TextBox();

  public TextBox() {
    xInner.HorizontalAlignment = HorizontalAlignment.Stretch;
    xInner.VerticalAlignment = VerticalAlignment.Stretch;
    xInner.MinHeight = 0;
    xInner.MinWidth = 0;
    xInner.Width = 100;
    xInner.FontSize = 16;
    xInner.LineHeight = 22;
    xInner.Padding = new Thickness(4, 4);
  }

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
