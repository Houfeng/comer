import { IDENTIFY } from "./Symbols";

export class Ref<T> {
  [IDENTIFY]: "Ref";
  current?: T;
  constructor(initialValue?: T) {
    this.current = initialValue;
  }
}
