export class Ref<T> {
  current?: T;
  constructor(initialValue?: T) {
    this.current = initialValue;
  }
}
