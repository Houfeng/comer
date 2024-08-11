using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public struct Point
{
  public int X { get; set; }
  public int Y { get; set; }
  public Point(int x, int y)
  {
    this.X = x;
    this.Y = y;
  }
}