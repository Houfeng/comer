using System;
namespace Comer.Runtime {
public partial class DockItem {

public override void RemoveChild(Comer.Runtime.Control child) {
   base.RemoveChild(child);
}

public override void InsertChild(Comer.Runtime.Control child, Comer.Runtime.Control? anchor) {
   base.InsertChild(child, anchor);
}

public override void AppendChild(Comer.Runtime.Control child) {
   base.AppendChild(child);
}

public override void PrependChild(Comer.Runtime.Control child) {
   base.PrependChild(child);
}

}
}