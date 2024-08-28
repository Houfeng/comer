using AC = Avalonia.Controls;
using Microsoft.JavaScript.NodeApi;
using Avalonia;
using Avalonia.Media;
using Avalonia.Layout;

namespace Comer.Runtime;

[JSExport]
public class Window : View {

  private AC.Window Win { get; set; }

  public Window() {
    this.__Raw__.VerticalAlignment = VerticalAlignment.Stretch;
    this.__Raw__.HorizontalAlignment = HorizontalAlignment.Stretch;
    this.Win = new AC.Window();
    this.Win.Content = this.__Raw__;
    this.__Raw__ = this.Win;
    this.Win.Width = 720;
    this.Win.Height = 480;
    this.Win.Title = "Window";
    // this.Inner.SystemDecorations = AC.SystemDecorations.BorderOnly;
    // this.Inner.ExtendClientAreaChromeHints = ExtendClientAreaChromeHints.NoChrome;
  }

  public virtual void Show() {
    this.Win.Show();
  }

  public virtual void Hide() {
    this.Win.Hide();
  }

  public virtual void Close() {
    this.Win.Close();
  }

  public virtual void Activate() {
    this.Win.Activate();
  }

  public virtual string Title {
    get {
      return this.Win.Title ?? "";
    }
    set {
      this.Win.Title = value;
    }
  }

  public virtual bool Resizable {
    get {
      return this.Win.CanResize;
    }
    set {
      this.Win.CanResize = value;
    }
  }

  public virtual double MaxWidth {
    get {
      return this.Win.MaxWidth;
    }
    set {
      this.Win.MaxWidth = value;
    }
  }

  public virtual double MaxHeight {
    get {
      return this.Win.MaxHeight;
    }
    set {
      this.Win.MaxHeight = value;
    }
  }

  public virtual double MinWidth {
    get {
      return this.Win.MinWidth;
    }
    set {
      this.Win.MinWidth = value;
    }
  }

  public virtual double MinHeight {
    get {
      return this.Win.MinHeight;
    }
    set {
      this.Win.MinHeight = value;
    }
  }

  public virtual int X {
    get {
      return this.Win.Position.X;
    }
    set {
      this.Win.Position = new PixelPoint(value, this.Win.Position.Y);
    }
  }

  public virtual int Y {
    get {
      return this.Win.Position.Y;
    }
    set {
      this.Win.Position = new PixelPoint(this.Win.Position.Y, value);
    }
  }

  public override double Width {
    get {
      return this.Win.Width;
    }

    set {
      this.Win.Width = value;
    }
  }

  public override double Height {
    get {
      return this.Win.Height;
    }
    set {
      this.Win.Height = value;
    }
  }

  public override string? Background {
    get {
      if (this.Win.Background == null) return null;
      return this.Win.Background.ToString();
    }
    set {
      if (value != null) {
        this.Win.Background = Brush.Parse(value);
      } else {
        this.Win.Background = null;
      }
    }
  }

  public override double Opacity {
    get {
      return this.Win.Opacity;
    }
    set {
      this.Win.Opacity = value;
    }
  }


  public override HorizontalAlign HorizontalAlign {
    get {
      return (HorizontalAlign)this.Win.HorizontalAlignment;
    }
    set {
      this.Win.HorizontalAlignment = (HorizontalAlignment)value;
    }
  }

  public override VerticalAlign VerticalAlign {
    get {
      return (VerticalAlign)this.Win.VerticalAlignment;
    }
    set {
      this.Win.VerticalAlignment = (VerticalAlignment)value;
    }
  }

  public override void RemoveChild(Control child) {
    base.RemoveChild(child);
  }

  public override void InsertChild(Control child, Control? anchor) {
    base.InsertChild(child, anchor);
  }

  public override void AppendChild(Control child) {
    base.AppendChild(child);
  }

  public override void PrependChild(Control child) {
    base.PrependChild(child);
  }

}