// using Microsoft.JavaScript.NodeApi;

// namespace Comer.Runtime;


// [JSExport]
// public partial class Event {
//   public Event() { }
//   public Event(object? sender, object? detail) {
//     Sender = sender;
//     Detail = detail;
//   }
//   public object? Sender { get; set; }
//   public object? Detail { get; set; }
// }

// [JSExport]
// public delegate void EventListener(Event e);

// [JSExport]
// public class EventTarget {

//   private Dictionary<string, List<EventListener>> Events =
//     new Dictionary<string, List<EventListener>>();

//   protected virtual List<EventListener> UseEventList(string name) {
//     if (Events.ContainsKey(name)) {
//       return Events[name];
//     } else {
//       var list = new List<EventListener>();
//       Events.Add(name, list);
//       return list;
//     }
//   }

//   protected virtual void DispatchEvent(string name, Event e) {
//     UseEventList(name).ForEach(it => it(e));
//   }

//   public virtual void AddEventListener(string name, EventListener listener) {
//     UseEventList(name).Add(listener);
//   }

//   public virtual void removeEventListener(string name, EventListener listener) {
//     UseEventList(name).Remove(listener);
//   }

//   public virtual void clearEventListener(string name) {
//     Events.Remove(name);
//   }

//   public virtual void clearEventListener() {
//     Events.Clear();
//   }

// }