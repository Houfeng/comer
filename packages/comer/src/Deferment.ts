import { Component } from "./Component";
import { Provider } from "./Provider";

/**
 * Declare component subtree as deferred
 * @class
 * @sealed
 */
export class Deferment extends Provider<true> {
  constructor(items: Readonly<Component[] | Component>) {
    const children = items ? (Array.isArray(items) ? items : [items]) : [];
    super({ readonly: true, value: true, children });
  }
}
