using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Text;

namespace Comer.Runtime.Generator;

[Generator]
public class InheritedPublicMethodGenerator : ISourceGenerator {

  private GeneratorLogger logger = new GeneratorLogger("InheritedPublicMethod");

  public void Initialize(GeneratorInitializationContext context) { }

  public void Execute(GeneratorExecutionContext context) {
    try {
      logger.log("Begin...");
      GenAllClasses(context);
      logger.log("end...");
    } catch (Exception err) {

      logger.log(err.Message + "::" + err.StackTrace);
    }
    logger.Done(context);
  }

  private void GenAllClasses(GeneratorExecutionContext context) {
    foreach (var syntaxTree in context.Compilation.SyntaxTrees) {
      var semanticModel = context.Compilation.GetSemanticModel(syntaxTree);
      var classDeclarationSyntaxes = from node in syntaxTree.GetRoot().DescendantNodes()
                                     where node.IsKind(SyntaxKind.ClassDeclaration)
                                     select (ClassDeclarationSyntax)node;
      foreach (var classDeclarationSyntax in classDeclarationSyntaxes) {
        if (semanticModel.GetDeclaredSymbol(classDeclarationSyntax) is { } classDeclarationSymbol) {
          GenOneClass(context, classDeclarationSymbol);
        }
      }
    }
  }

  private IEnumerable<IMethodSymbol> GetPublicMethods(INamedTypeSymbol classDeclarationSymbol) {
    if (classDeclarationSymbol == null) return [];
    var attr = classDeclarationSymbol.GetAttributes().FirstOrDefault(it => {
      if (it.AttributeClass == null) return false;
      return it.AttributeClass.Name.Contains("JSExportAttribute");
    });
    if (attr == null) return [];
    var baseMethods = classDeclarationSymbol.BaseType != null
    ? GetPublicMethods(classDeclarationSymbol.BaseType) : [];
    var ownMethods = classDeclarationSymbol.GetMembers()
      .Where(it => it.DeclaredAccessibility == Accessibility.Public
        && !it.IsStatic
        && !it.Name.StartsWith("get_")
        && !it.Name.StartsWith("set_")
        && !it.Name.StartsWith(".")
        && it.Kind == SymbolKind.Method);
    var combinedMethods = baseMethods.Concat(ownMethods);
    return combinedMethods.Cast<IMethodSymbol>();
  }

  private void GenOneClass(GeneratorExecutionContext context, INamedTypeSymbol classDeclarationSymbol) {
    if (classDeclarationSymbol == null) return;
    if (classDeclarationSymbol.BaseType == null) return;
    var publicMethods = GetPublicMethods(classDeclarationSymbol.BaseType);
    if (publicMethods.Count() < 1) return;
    var methodBuilder = new StringBuilder();
    foreach (var it in publicMethods) {
      var name = it.Name;
      var overrideType = it.IsVirtual || it.IsOverride ? "override" : "new";
      var returnType = it.ReturnType.ToString();
      var returnKey = returnType == "void" ? "" : "return";
      var paramDefines = new List<string>();
      var paramNames = new List<string>();
      foreach (var p in it.Parameters) {
        paramDefines.Add($"{p.Type} {p.Name}");
        paramNames.Add(p.Name);
      }
      var paramDefineText = string.Join(", ", paramDefines);
      var paramValueText = string.Join(", ", paramNames);
      methodBuilder.AppendLine("");
      methodBuilder.AppendLine($"public {overrideType} {returnType} {name}({paramDefineText}) {{");
      methodBuilder.AppendLine($"  {returnKey} base.{name}({paramValueText});");
      methodBuilder.AppendLine($"}}");
    }
    var ns = classDeclarationSymbol.ContainingNamespace;
    var className = classDeclarationSymbol.Name;
    context.AddSource($"{className}.g.cs",
@$"using System;
namespace {ns} {{
public partial class {className} {{
{methodBuilder}
}}
}}");
  }

}