using AC = Avalonia.Controls;
using Microsoft.JavaScript.NodeApi;
using Comer.Runtime.Controls;
using Avalonia.Platform.Storage;

namespace Comer.Runtime.Modules;

[JSExport]
public class EntryPickerOptions {
  public string? Title { get; set; }
  public bool? Multiple { get; set; }
  public string? Name { get; set; }
  public string? Location { get; set; }
}


[JSExport]
public class EntryPickerFilter {
  public string Title { get; set; } = "All files";
  public string[] Patterns { get; set; } = ["*.*"];
}

[JSExport]
public class EntryPickerOpenFileOptions : EntryPickerOptions {
  public EntryPickerFilter[]? Filters { get; set; }
}

[JSExport]
public class EntryPickerSaveFileOptions : EntryPickerOpenFileOptions {
  public string? Extension { get; set; }
  public bool? OverwritePrompt { get; set; }
}

[JSExport]
public class EntryPickerOpenFolderOptions : EntryPickerOptions { }

[JSExport]
public partial class EntryPicker {

  private static IStorageProvider? GetStorageProvider(ComerElement owner) {
    var topLevel = AC.TopLevel.GetTopLevel(owner.Bounding.Raw);
    if (topLevel == null) return null;
    return topLevel.StorageProvider;
  }

  public static async Task<IReadOnlyList<Entry>?> OpenFile(
    ComerElement owner,
    EntryPickerOpenFileOptions options
  ) {
    var provider = GetStorageProvider(owner);
    if (provider == null) return null;
    var items = await provider
    .OpenFilePickerAsync(new FilePickerOpenOptions {
      Title = options.Title ?? "File",
      AllowMultiple = options.Multiple ?? false,
      SuggestedFileName = options.Name ?? "",
      SuggestedStartLocation = options.Location != null
      ? await provider.TryGetFolderFromPathAsync(new Uri(options.Location))
      : null,
      FileTypeFilter = options.Filters != null
      ? options.Filters.Select(it => new FilePickerFileType(it.Title ?? "Files") {
        Patterns = (it.Patterns ?? ["*.*"]).ToArray(),
      }).ToArray()
      : null,
    });
    if (items == null) return null;
    return items.Select(it => new Entry() {
      Type = EntryType.File,
      Name = it.Name,
      Path = it.Path.AbsolutePath,
    }).ToArray();
  }

  public static async Task<Entry?> SaveFile(
    ComerElement owner,
    EntryPickerSaveFileOptions options
  ) {
    var provider = GetStorageProvider(owner);
    if (provider == null) return null;
    var file = await provider
    .SaveFilePickerAsync(new FilePickerSaveOptions {
      Title = options.Title ?? "Save file",
      SuggestedFileName = options.Name ?? "",
      SuggestedStartLocation = options.Location != null
      ? await provider.TryGetFolderFromPathAsync(new Uri(options.Location))
      : null,
    });
    if (file == null) return null;
    return new Entry() {
      Type = EntryType.File,
      Name = file.Name,
      Path = file.Path.AbsolutePath,
    };
  }

  public static async Task<IReadOnlyList<Entry>?> OpenFolder(
    ComerElement owner,
    EntryPickerOpenFolderOptions options
  ) {
    var provider = GetStorageProvider(owner);
    if (provider == null) return null;
    var items = await provider
    .OpenFolderPickerAsync(new FolderPickerOpenOptions {
      Title = options.Title ?? "Folder",
      AllowMultiple = options.Multiple ?? false,
      SuggestedFileName = options.Name ?? "",
      SuggestedStartLocation = options.Location != null
      ? await provider.TryGetFolderFromPathAsync(new Uri(options.Location))
      : null,
    });
    if (items == null) return null;
    return items.Select(it => new Entry() {
      Type = EntryType.File,
      Name = it.Name,
      Path = it.Path.AbsolutePath,
    }).ToArray();
  }

}
