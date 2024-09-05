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

public class PropertyAccessors<T> where T : ComerElement {
  private Dictionary<string, PropertyAccessor<T>> Accessors { get; } =
    new Dictionary<string, PropertyAccessor<T>>();

  public PropertyAccessors<T> Register(string name, PropertyAccessor<T> accessor) {
    Accessors.Add(name, accessor);
    return this;
  }

  public PropertyAccessors<T> Register(
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
  private static Dictionary<Type, PropertyAccessors<ComerElement>> AccessorsMap { get; }
    = new Dictionary<Type, PropertyAccessors<ComerElement>>();

  public static PropertyAccessors<T> UseAccessors<T>() where T : ComerElement {
    var type = typeof(T);
    if (AccessorsMap.ContainsKey(type)) {
      return (AccessorsMap[type] as PropertyAccessors<T>)!;
    }
    var accessors = new PropertyAccessors<T>();
    AccessorsMap.Add(type, (accessors as PropertyAccessors<ComerElement>)!);
    return accessors;
  }

  private static PropertyAccessors<ComerElement>? GetAccessors(ComerElement target) {
    var type = target.GetType();
    PropertyAccessors<ComerElement>? accessors = null;
    while (type != null && type != typeof(object)) {
      if (AccessorsMap.ContainsKey(type)) {
        accessors = AccessorsMap[type];
        break;
      }
      type = type.BaseType;
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