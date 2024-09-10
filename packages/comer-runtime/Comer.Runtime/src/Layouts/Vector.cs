using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public class Vector {
  public double X { get; set; }
  public double Y { get; set; }
  public Vector(double x, double y) {
    X = x;
    Y = y;
  }
}