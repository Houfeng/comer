using Comer.Runtime.Controls;

namespace Comer.Runtime.Properties;

public delegate object? PropertyGetter<T>(T target) where T : ComerElement;
public delegate void PropertySetter<T>(T target, object value) where T : ComerElement;

public class PropertyAccessor<T> where T : ComerElement {
  private PropertyGetter<T> Getter { get; set; }
  private PropertySetter<T> Setter { get; set; }

  public PropertyAccessor(
    PropertyGetter<T> getter,
    PropertySetter<T> setter
  ) {
    Getter = getter;
    Setter = setter;
  }

  public void SetValue(T target, object value) {
    Setter(target, value);
  }

  public object? GetValue(T target) {
    return Getter(target);
  }
}

public interface IPropertyAccessors<T> where T : ComerElement {
  IPropertyAccessors<T> Register(string name, PropertyAccessor<T> accessor);
  IPropertyAccessors<T> Register(
    string name,
    PropertyGetter<T> getter,
    PropertySetter<T> setter
  );
  void SetValue(T target, string name, object value);
  object? GetValue(T target, string name);
}

public class PropertyAccessors<T> : IPropertyAccessors<T> where T : ComerElement {
  private Dictionary<string, PropertyAccessor<T>> Accessors { get; } =
    new Dictionary<string, PropertyAccessor<T>>();

  public IPropertyAccessors<T> Register(string name, PropertyAccessor<T> accessor) {
    Accessors.Add(name, accessor);
    return this;
  }

  public IPropertyAccessors<T> Register(
    string name,
    PropertyGetter<T> getter,
    PropertySetter<T> setter
  ) {
    var accessor = new PropertyAccessor<T>(getter, setter);
    return Register(name, accessor);
  }

  public void SetValue(T target, string name, object value) {
    if (!Accessors.ContainsKey(name)) return;
    var accessor = Accessors[name];
    accessor.SetValue(target, value);
  }

  public object? GetValue(T target, string name) {
    if (!Accessors.ContainsKey(name)) return null;
    var accessor = Accessors[name];
    return accessor.GetValue(target);
  }
}

public class PropertiesManager {
  private static Dictionary<string, IPropertyAccessors<ComerElement>> AccessorsMap { get; }
    = new Dictionary<string, IPropertyAccessors<ComerElement>>();

  public static IPropertyAccessors<T> UseAccessors<T>(string type) where T : ComerElement {
    if (AccessorsMap.ContainsKey(type)) {
      return (IPropertyAccessors<T>)AccessorsMap[type];
    }
    var accessors = new PropertyAccessors<T>();
    AccessorsMap.Add(type, (IPropertyAccessors<ComerElement>)accessors);
    return accessors;
  }

  private static IPropertyAccessors<ComerElement>? GetAccessors(ComerElement target) {
    var type = target.Type;
    IPropertyAccessors<ComerElement>? accessors = null;
    while (type != null && type != "Object") {
      if (AccessorsMap.ContainsKey(type)) {
        accessors = AccessorsMap[type];
        break;
      }
      type = target.Parent?.Type;
    }
    return accessors;
  }

  public static void SetValue(ComerElement target, string name, object value) {
    var accessors = GetAccessors(target);
    if (accessors == null) return;
    accessors.SetValue(target, name, value);
  }

  public static object? GetValue(ComerElement target, string name) {
    var accessors = GetAccessors(target);
    if (accessors == null) return null;
    return accessors.GetValue(target, name);
  }

}