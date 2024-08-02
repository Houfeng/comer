import { isFunction } from "ntils";
import { HostEventListener } from "./HostAdapter";

export function isEventName(name: string) {
  return !!name && /^on/.test(name);
}

export function takeHostEvents(props: object) {
  const events: Record<string, HostEventListener> = {};
  const others: Record<string, unknown> = {};
  Object.entries(props).forEach(([key, value]) => {
    if (key === "ref") return;
    if (isEventName(key) && isFunction(value)) {
      events[key.slice(2)] = value;
    } else {
      others[key] = value;
    }
  });
  return { events, others };
}
