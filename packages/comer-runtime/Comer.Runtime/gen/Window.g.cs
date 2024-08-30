﻿using System;
namespace Comer.Runtime {
public partial class Window {

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