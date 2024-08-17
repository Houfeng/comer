using Avalonia;
using Avalonia.Controls;
using Avalonia.Layout;
using Avalonia.Media;
using Avalonia.Skia;
using Avalonia.Styling;
using Avalonia.Themes.Fluent;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Debugger;

public class App : Application
{

}

[JSExport]
public static class Program
{

  public static void StartGtkApp()
  {
    // Application.Init();
    // var win = new Window();
    // var btn = new Button();
    // win.addChild(btn);
    // win.Show();
    // Application.Run();
  }

  [STAThread]
  public static void Main()
  {
    Init();
  }

  public static void Init()
  {

    AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .UseSkia()
    .UseStandardRuntimePlatformSubsystem()
    .Start((app, args) =>
    {
      // var theme = new FluentTheme();
      // app.Styles.Add(theme);

      var win = new Window();
      win.Width = 300;
      win.Height = 300;
      win.Position = new PixelPoint(0, 0);
      win.Show();

      var btn = new Button();
      btn.Content = "你好";
      btn.VerticalAlignment = VerticalAlignment.Center;
      btn.HorizontalAlignment = HorizontalAlignment.Center;
      btn.HorizontalContentAlignment = HorizontalAlignment.Center;
      btn.VerticalContentAlignment = VerticalAlignment.Center;
      btn.FontSize = 24;
      btn.Background = Brushes.Red;
      btn.Foreground = Brushes.WhiteSmoke;
      btn.Width = 200;
      btn.Height = 100;
      btn.BorderBrush=Brushes.YellowGreen;
      btn.BorderThickness = new Thickness(5);
      // btn.Styles.Add()

      win.Content = btn;

      app.Run(win);
    }, []);

    // while (true)
    // {
    //   Thread.Sleep(1000/)
    // }

  }

  public static void ShowMainWindow()
  {
    var win = new Window();
    win.Width = 300;
    win.Height = 300;
    win.Position = new PixelPoint(0, 0);
    win.Show();
    // return win;
  }

  public static void Tick()
  {
    Avalonia.Threading.Dispatcher.UIThread.RunJobs();
  }

}
