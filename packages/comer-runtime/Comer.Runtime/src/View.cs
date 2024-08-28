
using Avalonia.Controls;
using Avalonia.Layout;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public class View : Control {

  private Panel Inner { get; set; }

  public View() {
    this.Inner = new Panel();
    this.Inner.HorizontalAlignment = HorizontalAlignment.Stretch;
    this.Inner.VerticalAlignment = VerticalAlignment.Stretch;
    this.__Content__ = this.Inner;
  }

  public virtual void RemoveChild(Control child) {
    if (this.Inner.Children.Contains(child.__Raw__)) {
      this.Inner.Children.Remove(child.__Raw__);
    }
  }

  public virtual void InsertChild(Control child, Control? anchor) {
    this.RemoveChild(child);
    if (anchor != null) {
      var anchorIndex = this.Inner.Children.IndexOf(anchor.__Raw__);
      this.Inner.Children.Insert(anchorIndex + 1, child.__Raw__);
    } else {
      this.Inner.Children.Insert(0, child.__Raw__);
    }
  }

  public virtual void AppendChild(Control child) {
    this.RemoveChild(child);
    var count = this.Inner.Children.Count;
    this.Inner.Children.Insert(count, child.__Raw__);
  }

  public virtual void PrependChild(Control child) {
    this.RemoveChild(child);
    this.Inner.Children.Insert(0, child.__Raw__);
  }

  public void test() {

  }

  public object test2 {
    get {
      return this.test;
    }
  }

}
