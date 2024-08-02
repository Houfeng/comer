import { IDENTIFY } from "./Symbols";

export class Ref<T> {
  [IDENTIFY]: "Ref";
  // __key__: keyof T;
  current?: T;
  constructor(initialValue?: T) {
    this.current = initialValue;
  }
}
