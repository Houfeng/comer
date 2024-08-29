using Avalonia;
using Avalonia.Threading;
using Avalonia.Themes.Fluent;
using Microsoft.JavaScript.NodeApi;

namespace Comer.Runtime;

[JSExport]
public partial class Application {
  private class App : Avalonia.Application {
    public App() {
      Name = "Comer App";
      var theme = new FluentTheme();
      Styles.Add(theme);
    }
  }

  public static void Init() {
    AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .UseStandardRuntimePlatformSubsystem()
    .With(new AvaloniaNativePlatformOptions {
      // AvaloniaNativeLibraryPath = “[Path to your dylib]”,
    })
    .Start((app, args) => { }, []);
  }

  public static void Tick() {
    try {
      var token = new CancellationTokenSource();
      DispatcherTimer.RunOnce(
        () => token.Cancel(),
        TimeSpan.FromMilliseconds(100)
      );
      Dispatcher.UIThread.MainLoop(token.Token);
    } catch {
      //TODO: emit error event
    }
  }

  private static CancellationTokenSource? RunToken { get; set; }

  internal static void Start() {
    RunToken = new CancellationTokenSource();
    Dispatcher.UIThread.MainLoop(RunToken.Token);
  }

  internal static void Stop() {
    if (RunToken == null) return;
    RunToken.Cancel();
  }

}
