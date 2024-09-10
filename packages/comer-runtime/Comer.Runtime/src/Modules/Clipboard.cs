using Avalonia.Controls;
using Avalonia.Input;
using Avalonia.Input.Platform;
using Comer.Runtime.Controls;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;

namespace Comer.Runtime.Modules;

[JSExport]
public class ContentType {
  public static string Text { get; set; } = "Text";
  public static string Files { get; set; } = "Files";
}

[JSExport]
public partial class Clipboard {

  private static IClipboard? GetClipboard(ComerElement owner) {
    var topLevel = AC.TopLevel.GetTopLevel(owner.Bounding.Raw);
    if (topLevel == null) return null;
    return topLevel.Clipboard;
  }

  public static async Task SetData(ComerElement owner, string type, object data) {
    var clipboard = GetClipboard(owner);
    if (clipboard == null) return;
    var item = new DataObject();
    item.Set(type, data);
    await clipboard.SetDataObjectAsync(item);
  }

  public static async Task<object?> GetData(ComerElement owner, string type) {
    var clipboard = GetClipboard(owner);
    if (clipboard == null) return null;
    return await clipboard.GetDataAsync(type);
  }
}
