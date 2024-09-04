using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public partial class ComerStyle {
  public string Selector { get; set; } = "";
  private Properties<string> Properties { get; set; } = new Properties<string>();
  private List<ComerStyle> ChildItems { get; set; } = new List<ComerStyle>();
  public ComerStyle() { }
  public void SetProperty(string name, string value) {
    Properties[name] = value ?? "";
  }
  public string GetProperty(string name) {
    return Properties[name] ?? "";
  }
  public void AddChild(ComerStyle child) {
    ChildItems.Add(child);
  }
  public void RemoveChild(ComerStyle child) {
    ChildItems.Remove(child);
  }
  public ComerStyle[] Children {
    get {
      return ChildItems.ToArray();
    }
  }
}