using System;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public class File {
  public File() { }
  public string? Path { get; set; }
  public string? Name { get; set; }
  public string? Type { get; set; }
  public double? Size { get; set; }
}
