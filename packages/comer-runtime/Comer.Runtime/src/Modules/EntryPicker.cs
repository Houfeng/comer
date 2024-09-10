using AC = Avalonia.Controls;
using Microsoft.JavaScript.NodeApi;
using Comer.Runtime.Controls;
using Avalonia.Platform.Storage;

namespace Comer.Runtime.Modules;

[JSExport]
public class EntryPickerOptions {
  public EntryType Type { get; set; }
  public string? Title { get; set; }
  public bool? Multi { get; set; }
  public IReadOnlyList<EntryPickerFilter>? Filters;
  public string? Name { get; set; }
  public string? Location { get; set; }
}

[JSExport]
public class EntryPickerFilter {
  public string Title { get; set; } = "All files";
  public IReadOnlyList<string> Patterns = ["*.*"];
}

[JSExport]
public partial class EntryPicker {
  private static async Task<IReadOnlyList<Entry>> OpenFile(
    ComerElement owner,
    EntryPickerOptions options
  ) {
    var topLevel = AC.TopLevel.GetTopLevel(owner.Bounding.Raw);
    if (topLevel == null) return [];
    var items = await topLevel.StorageProvider
    .OpenFilePickerAsync(new FilePickerOpenOptions {
      Title = options.Title ?? "File",
      AllowMultiple = options.Multi ?? false,
      SuggestedFileName = options.Name ?? "",
      SuggestedStartLocation = options.Location != null
      ? await topLevel.StorageProvider.TryGetFolderFromPathAsync(new Uri(options.Location))
      : null,
      FileTypeFilter = options.Filters != null
      ? options.Filters.Select(it => new FilePickerFileType(it.Title ?? "Files") {
        Patterns = it.Patterns ?? ["*.*"],
      }).ToArray()
      : null,
    });
    return items.Select(it => new Entry() {
      Type = EntryType.File,
      Name = it.Name,
      Path = it.Path.AbsolutePath,
    }).ToArray();
  }

  private static async Task<IReadOnlyList<Entry>> OpenFolder(
    ComerElement owner,
    EntryPickerOptions options
  ) {
    var topLevel = AC.TopLevel.GetTopLevel(owner.Bounding.Raw);
    if (topLevel == null) return [];
    var items = await topLevel.StorageProvider
    .OpenFolderPickerAsync(new FolderPickerOpenOptions {
      Title = options.Title ?? "Folder",
      AllowMultiple = options.Multi ?? false,
      SuggestedFileName = options.Name ?? "",
      SuggestedStartLocation = options.Location != null
      ? await topLevel.StorageProvider.TryGetFolderFromPathAsync(new Uri(options.Location))
      : null,
    });
    return items.Select(it => new Entry() {
      Type = EntryType.File,
      Name = it.Name,
      Path = it.Path.AbsolutePath,
    }).ToArray();
  }

  public static async Task<IReadOnlyList<Entry>> Open(
    ComerElement owner,
    EntryPickerOptions options
  ) {
    if (options.Type == EntryType.File) {
      return await OpenFile(owner, options);
    } else {
      return await OpenFolder(owner, options);
    }
  }

}
