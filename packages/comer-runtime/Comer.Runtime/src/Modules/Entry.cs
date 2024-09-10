using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime.Modules;

[JSExport]
public enum EntryType {
  File,
  Folder
}

[JSExport]
public partial class Entry {
  public Entry() {
    Type = EntryType.File;
    Path = "";
  }
  public EntryType Type { get; set; }
  public string Path { get; set; }
  public double? Size { get; set; }
  public string? Name { get; set; }
  public string? Mime { get; set; }
}
