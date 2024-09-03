using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime.Test;


[JSExport]
public class App {
  public static void Main(string[] args) {
    var dict = new Dictionary<string, object>();
    var fn = () => Console.WriteLine(dict["name"]);
    dict["name"] = "xxx";
    fn();
  }
}
