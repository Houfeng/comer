using Avalonia;
using Avalonia.Threading;
using Avalonia.Themes.Simple;
using Microsoft.JavaScript.NodeApi;
using AC = Avalonia.Controls;
using Comer.Runtime.Controls;

namespace Comer.Runtime;

class InnerApp : Application {
  public InnerApp() {
    Name = "Comer App";
    var theme = new SimpleTheme();
    Styles.Add(theme);
  }

  public override void OnFrameworkInitializationCompleted() {
    AC.NativeMenu.GetMenu(this)?.Items.Clear();
  }
}

[JSExport]
public partial class ComerApp {

  internal static Application? AppDelegate { get; private set; }

  public static void Init() {
    AppBuilder.Configure<InnerApp>()
    .UsePlatformDetect()
    .UseStandardRuntimePlatformSubsystem()
    .With(new AvaloniaNativePlatformOptions { })
    .Start((app, args) => {
      AppDelegate = app;
    }, []);
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

  private static Menu? _menu { get; set; }

  public static Menu? Menu {
    get {
      return _menu;
    }
    set {
      if (AppDelegate == null || value == null) return;
      var appMenu = AC.NativeMenu.GetMenu(AppDelegate);
      if (appMenu == null) return;
      value.Itmes.ToList().ForEach(it => appMenu.Add(it.ToNative()));
    }
  }

}
