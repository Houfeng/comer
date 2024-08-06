import { HostAdapter, HostElement } from "./HostAdapter";

export class Scheduler<T extends HostAdapter<HostElement>> {
  /**
   * Create a comer scheduler instance using the specified adapter
   * @param adapter Host adapter (eg. DOMAdapter)
   */
  constructor(protected adapter: T) {}
}
