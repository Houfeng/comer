using System.Text;
using Microsoft.CodeAnalysis;

namespace Comer.Runtime.Generator;

public class GeneratorLogger {

  private string Name;

  public GeneratorLogger(string name) {
    this.Name = name;
  }

  private StringBuilder builder = new StringBuilder();

  public void log(string text) {
    this.builder.AppendLine($@"// {text.Replace("\n", "\n//")}");
  }

  public void Done(GeneratorExecutionContext context) {
    context.AddSource($"__{this.Name}.log", builder.ToString());
  }
}