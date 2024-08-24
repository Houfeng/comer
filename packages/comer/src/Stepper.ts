export class Stepper {
  private _current = 1;

  get current() {
    return this._current;
  }

  next() {
    return this._current++;
  }
}
