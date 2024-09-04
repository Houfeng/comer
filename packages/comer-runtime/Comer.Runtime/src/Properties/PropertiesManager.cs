using Comer.Runtime.Controls;

namespace Comer.Runtime.Properties;

public delegate object? PropertyGetter(ComerElement target);
public delegate void PropertySetter(ComerElement target, object value);

public class Property {
  private PropertyGetter Getter { get; set; }
  private PropertySetter Setter { get; set; }

  public Property(
    PropertyGetter getter,
    PropertySetter setter
  ) {
    Getter = getter;
    Setter = setter;
  }

  internal void SetValue(ComerElement target, object value) {
    Setter(target, value);
  }

  internal object? GetValue(ComerElement target) {
    return Getter(target);
  }
}

public class PropertiesManager {
  private static Dictionary<Type, Dictionary<string, Property>> Properties { get; }
    = new Dictionary<Type, Dictionary<string, Property>>();

  private static Dictionary<string, Property> UseTypedProperties<T>() {
    var type = typeof(T);
    if (Properties.ContainsKey(type)) return Properties[type];
    var dict = new Dictionary<string, Property>();
    Properties.Add(type, dict);
    return dict;
  }

  public static void RegisterProperty<T>(string name, Property property) {
    var dict = UseTypedProperties<T>();
    dict.Add(name, property);
  }

  public static void RegisterProperty<T>(string name, PropertyGetter getter,
   PropertySetter setter) {
    var property = new Property(getter, setter);
    RegisterProperty<T>(name, property);
  }

  private static Property? GetProperty(object target, string name) {
    var type = target.GetType();
    Dictionary<string, Property>? dict = null;
    var objectType = typeof(object);
    while (type != null && type != objectType) {
      if (Properties.ContainsKey(type)) {
        dict = Properties[type];
        break;
      }
      type = type.BaseType;
    }
    if (dict == null || !dict.ContainsKey(name)) return null;
    return dict[name];
  }

  public static void SetValue(ComerElement target, string name, object value) {
    var property = GetProperty(target, name);
    if (property == null) return;
    property.SetValue(target, value);
  }

  public static object? GetValue(ComerElement target, string name) {
    var property = GetProperty(target, name);
    if (property == null) return null;
    return property.GetValue(target);
  }

}