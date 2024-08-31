using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

public enum EntryKind {
  File,
  Folder
}

[JSExport]
public partial class Entry {
  public Entry() {
    Kind = EntryKind.File;
    Path = "";
    Size = 0;
  }
  public EntryKind Kind { get; set; }
  public string Path { get; set; }
  public double Size { get; set; }
  public string? Name { get; set; }
  public string? Type { get; set; }
}
