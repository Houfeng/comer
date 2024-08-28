using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public struct Vector {
  public double X { get; set; }
  public double Y { get; set; }
  public Vector(double x, double y) {
    this.X = x;
    this.Y = y;
  }
}