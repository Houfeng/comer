/** @internal */
export function isEventName(name: string) {
  return !!name && /^on/.test(name);
}
