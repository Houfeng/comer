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

public interface IPropertiesAccessor<out T> where T : ComerElement {
  IPropertiesAccessor<T> Register(
    string name,
    PropertyGetter<T> getter,
    PropertySetter<T> setter
  );
  bool Has(string name);
  void SetValue(ComerElement target, string name, object value);
  object? GetValue(ComerElement target, string name);
}

public class PropertiesAccessor<T> : IPropertiesAccessor<T> where T : ComerElement {
  private Dictionary<string, PropertyAccessor<T>> Accessors { get; } = new();

  public IPropertiesAccessor<T> Register(
    string name,
    PropertyGetter<T> getter,
    PropertySetter<T> setter
  ) {
    var accessor = new PropertyAccessor<T>(getter, setter);
    Accessors.Add(name, accessor);
    return this;
  }

  public bool Has(string name) {
    return Accessors.ContainsKey(name);
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
  private static Dictionary<Type, IPropertiesAccessor<ComerElement>> Accessors { get; }
    = new();

  public static IPropertiesAccessor<T> UseAccessors<T>() where T : ComerElement {
    var type = typeof(T);
    if (Accessors.ContainsKey(type)) {
      return (IPropertiesAccessor<T>)Accessors[type];
    }
    var accessors = new PropertiesAccessor<T>();
    Accessors.Add(type, accessors);
    return accessors;
  }

  public static void SetValue(ComerElement target, string name, object value) {
    var type = target.GetType();
    while (type != null) {
      if (Accessors.ContainsKey(type) && Accessors[type].Has(name)) {
        Accessors[type].SetValue(target, name, value);
        return;
      }
      type = type.BaseType;
    }
  }

  public static object? GetValue(ComerElement target, string name) {
    var type = target.GetType();
    while (type != null) {
      if (Accessors.ContainsKey(type) && Accessors[type].Has(name)) {
        return Accessors[type].GetValue(target, name);
      }
      type = type.BaseType;
    }
    return null;
  }

}