using Avalonia;
using Avalonia.Threading;
using Avalonia.Themes.Fluent;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport(false)]
internal class App : Avalonia.Application {
  public App() {
    Name = "Comer App";
    var theme = new FluentTheme();
    Styles.Add(theme);
  }
}

[JSExport]
public partial class Application {

  public static void Init() {
    AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .UseStandardRuntimePlatformSubsystem()
    .With(new AvaloniaNativePlatformOptions { })
    .Start((app, args) => { }, []);
  }

  public static void Tick() {
    try {
      var token = new CancellationTokenSource();
      DispatcherTimer.RunOnce(
        () => token.Cancel(),
        TimeSpan.FromMilliseconds(0)
      );
      Dispatcher.UIThread.MainLoop(token.Token);
    } catch (Exception ex) {
      Console.WriteLine("[Error]", ex.Message, "::", ex.StackTrace);
    }
  }

  /// <summary>
  /// only for typescript types
  /// </summary>
  public static void Run() { }

  [JSExport(false)]
  private static CancellationTokenSource? RunToken { get; set; }

  [JSExport(false)]
  public static void Start() {
    RunToken = new CancellationTokenSource();
    Dispatcher.UIThread.MainLoop(RunToken.Token);
  }

  [JSExport(false)]
  public static void Stop() {
    if (RunToken == null) return;
    RunToken.Cancel();
  }

}
