using AC = Avalonia.Controls;
using Microsoft.JavaScript.NodeApi;
using Avalonia;
using Avalonia.Media;
using Avalonia.Layout;

namespace Comer.Runtime;

[JSExport]
public partial class Window : View {

  private AC.Window Win { get; set; }

  public Window() {
    __Raw__.VerticalAlignment = VerticalAlignment.Stretch;
    __Raw__.HorizontalAlignment = HorizontalAlignment.Stretch;
    Win = new AC.Window();
    Win.Content = __Raw__;
    __Raw__ = Win;
    Win.Width = 720;
    Win.Height = 480;
    Win.Title = "Window";
    // this.Inner.SystemDecorations = AC.SystemDecorations.BorderOnly;
    // this.Inner.ExtendClientAreaChromeHints = ExtendClientAreaChromeHints.NoChrome;
  }

  public virtual void Show() {
    Win.Show();
  }

  public virtual void Hide() {
    Win.Hide();
  }

  public virtual void Close() {
    Win.Close();
  }

  public virtual void Activate() {
    Win.Activate();
  }

  public virtual string Title {
    get {
      return Win.Title ?? "";
    }
    set {
      Win.Title = value;
    }
  }

  public virtual bool Resizable {
    get {
      return Win.CanResize;
    }
    set {
      Win.CanResize = value;
    }
  }

  public virtual double MaxWidth {
    get {
      return Win.MaxWidth;
    }
    set {
      Win.MaxWidth = value;
    }
  }

  public virtual double MaxHeight {
    get {
      return Win.MaxHeight;
    }
    set {
      Win.MaxHeight = value;
    }
  }

  public virtual double MinWidth {
    get {
      return Win.MinWidth;
    }
    set {
      Win.MinWidth = value;
    }
  }

  public virtual double MinHeight {
    get {
      return Win.MinHeight;
    }
    set {
      Win.MinHeight = value;
    }
  }

  public virtual int X {
    get {
      return Win.Position.X;
    }
    set {
      Win.Position = new PixelPoint(value, Win.Position.Y);
    }
  }

  public virtual int Y {
    get {
      return Win.Position.Y;
    }
    set {
      Win.Position = new PixelPoint(Win.Position.Y, value);
    }
  }

  public override double Width {
    get {
      return Win.Width;
    }

    set {
      Win.Width = value;
    }
  }

  public override double Height {
    get {
      return Win.Height;
    }
    set {
      Win.Height = value;
    }
  }

  public override string? Background {
    get {
      if (Win.Background == null) return null;
      return Win.Background.ToString();
    }
    set {
      if (value != null) {
        Win.Background = Brush.Parse(value);
      } else {
        Win.Background = null;
      }
    }
  }

  public override double Opacity {
    get {
      return Win.Opacity;
    }
    set {
      Win.Opacity = value;
    }
  }


  public override HorizontalAlign HorizontalAlign {
    get {
      return (HorizontalAlign)Win.HorizontalAlignment;
    }
    set {
      Win.HorizontalAlignment = (HorizontalAlignment)value;
    }
  }

  public override VerticalAlign VerticalAlign {
    get {
      return (VerticalAlign)Win.VerticalAlignment;
    }
    set {
      Win.VerticalAlignment = (VerticalAlignment)value;
    }
  }

}