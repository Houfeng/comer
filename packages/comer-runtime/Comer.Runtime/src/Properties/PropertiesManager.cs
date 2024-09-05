using Comer.Runtime.Controls;

namespace Comer.Runtime.Properties;

public delegate object? PropertyGetter<in T>(T target) where T : ComerElement;
public delegate void PropertySetter<in T>(T target, object value) where T : ComerElement;

public class PropertyAccessor<T> where T : ComerElement {
  private PropertyGetter<ComerElement> Getter { get; set; }
  private PropertySetter<ComerElement> Setter { get; set; }

  public PropertyAccessor(
    PropertyGetter<T> getter,
    PropertySetter<T> setter
  ) {
    Getter = target => getter((T)target);
    Setter = (target, value) => setter((T)target, value);
  }

  public void SetValue(ComerElement target, object value) {
    Setter(target, value);
  }

  public object? GetValue(ComerElement target) {
    return Getter(target);
  }
}

public interface IPropertyAccessors<out T> where T : ComerElement {
  IPropertyAccessors<T> Register(
    string name,
    PropertyGetter<T> getter,
    PropertySetter<T> setter
  );
  void SetValue(ComerElement target, string name, object value);
  object? GetValue(ComerElement target, string name);
}

public class PropertyAccessors<T> : IPropertyAccessors<T> where T : ComerElement {
  private Dictionary<string, PropertyAccessor<T>> Accessors { get; } =
    new Dictionary<string, PropertyAccessor<T>>();

  public IPropertyAccessors<T> Register(
    string name,
    PropertyGetter<T> getter,
    PropertySetter<T> setter
  ) {
    var accessor = new PropertyAccessor<T>(getter, setter);
    Accessors.Add(name, accessor);
    return this;
  }

  public void SetValue(ComerElement target, string name, object value) {
    if (!Accessors.ContainsKey(name)) return;
    var accessor = Accessors[name];
    accessor.SetValue(target, value);
  }

  public object? GetValue(ComerElement target, string name) {
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
    AccessorsMap.Add(type, accessors);
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