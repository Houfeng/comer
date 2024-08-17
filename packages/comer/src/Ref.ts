import { $Value } from "./Symbols";

/**
 * Ref class,
 * which can be used to create a ref instance of a specified type
 * @class
 */
export class Ref<T> {
  /** @internal */
  private [$Value]?: T;

  constructor(initialValue?: T) {
    this[$Value] = initialValue;
  }

  get current(): T | undefined {
    return this[$Value];
  }
}

/**
 * Create a ref instance of a specified type
 * @param initialValue Initial value
 * @returns
 * @function
 */
export function createRef<T>(initialValue?: T): Ref<T> {
  return new Ref<T>(initialValue);
}
