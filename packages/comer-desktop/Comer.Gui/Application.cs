using Avalonia;
using Avalonia.Threading;
using Avalonia.Themes.Fluent;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Gui;

[JSExport]
public class Application {
  private class App : Avalonia.Application {
  }

  public static void Init() {
    AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .UseStandardRuntimePlatformSubsystem()
    .Start((app, args) => {
      var theme = new FluentTheme();
      app.Styles.Add(theme);
    }, []);
  }

  public static void Tick() {
    var token = new CancellationTokenSource();
    DispatcherTimer.RunOnce(
      () => token.Cancel(),
      TimeSpan.FromMilliseconds(100)
    );
    Dispatcher.UIThread.MainLoop(token.Token);
  }

  private static CancellationTokenSource? RunToken { get; set; }

  public static void Start() {
    RunToken = new CancellationTokenSource();
    Dispatcher.UIThread.MainLoop(RunToken.Token);
  }

  public static void Stop() {
    if (RunToken == null) return;
    RunToken.Cancel();
  }

}
