using System;
namespace Comer.Runtime {
public partial class TextBox {

public override void AddEventListener(string name, Comer.Runtime.EventListener listener) {
   base.AddEventListener(name, listener);
}

public override void removeEventListener(string name, Comer.Runtime.EventListener listener) {
   base.removeEventListener(name, listener);
}

public override void clearEventListener(string name) {
   base.clearEventListener(name);
}

public override void clearEventListener() {
   base.clearEventListener();
}

}
}