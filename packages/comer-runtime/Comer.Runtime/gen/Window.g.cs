using System;
namespace Comer.Runtime {
public partial class Window {

public new void RemoveChild(Comer.Runtime.ComerElement child) {
   base.RemoveChild(child);
}

public new void InsertChild(Comer.Runtime.ComerElement child, Comer.Runtime.ComerElement? anchor) {
   base.InsertChild(child, anchor);
}

public new void AppendChild(Comer.Runtime.ComerElement child) {
   base.AppendChild(child);
}

public new void PrependChild(Comer.Runtime.ComerElement child) {
   base.PrependChild(child);
}

}
}