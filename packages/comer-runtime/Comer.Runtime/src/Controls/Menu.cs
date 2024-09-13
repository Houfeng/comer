using Avalonia.Controls;
using Avalonia.Input;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime.Controls;


[JSExport]
public class MenuItem {
  public string? Title { get; set; }
  public bool? Enabled { get; set; }
  public bool? Visible { get; set; }
  public bool? Checked { get; set; }
  public Action? OnClick { get; set; }
  public Menu? Menu { get; set; }
  internal NativeMenuItem ToNative() {
    NativeMenuItem item = new NativeMenuItem();
    item.Header = Title;
    item.IsEnabled = Enabled ?? true;
    item.IsVisible = Visible ?? true;
    // item.Gesture = new KeyGesture(Key.T, KeyModifiers.Meta | KeyModifiers.Control);
    if (OnClick != null) item.Click += (_, e) => OnClick();
    return item;
  }
}

[JSExport]
public partial class Menu {
  public IReadOnlyList<MenuItem> Itmes { get; private set; } = [];

  public Menu() {
    Itmes = [];
  }

  internal NativeMenu ToNative() {
    NativeMenu menu = new NativeMenu();
    Itmes.ToList().ForEach(it => menu.Add(it.ToNative()));
    return menu;
  }
}