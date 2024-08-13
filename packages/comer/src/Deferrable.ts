import { Component } from "./Component";
import { Provider } from "./Provider";

/**
 * Declare component subtree as deferrable
 * @class
 */
export class Deferrable extends Provider<true> {
  constructor(items: Readonly<Component[] | Component>) {
    const children = items ? (Array.isArray(items) ? items : [items]) : [];
    super({ value: true, children });
  }
}
