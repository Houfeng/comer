using System;
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
  private AC.TextBox raw { get; set; }
  public TextBox() {
    raw = new AC.TextBox();
    xOuter = raw;
  }

  public string Value {
    get {
      return raw.Text ?? "";
    }
    set {
      raw.Text = value;
    }
  }

  public string Placeholder {
    get {
      return raw.Watermark ?? "";
    }
    set {
      raw.Watermark = value;
    }
  }

  public string Mask {
    get {
      return new string([raw.PasswordChar]);
    }
    set {
      raw.PasswordChar = value[0];
    }
  }

  public bool MultiLine {
    get {
      return raw.AcceptsReturn;
    }
    set {
      raw.AcceptsReturn = value;
    }
  }

  public TextWrapping Wrapping {
    get {
      return (TextWrapping)raw.TextWrapping;
    }
    set {
      raw.TextWrapping = (AM.TextWrapping)value;
    }
  }

}
