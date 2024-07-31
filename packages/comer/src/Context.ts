import { observable } from "ober";
import { AnyFunction } from "./TypeUtil";

export class Context<T extends object> {
  private stack: Array<T> = [];

  constructor(defaultValue?: T) {
    if (defaultValue) this.stack = [observable(defaultValue)];
  }

  /** @internal */
  run<F extends AnyFunction>(value: T, fn: F): ReturnType<F> {
    try {
      this.stack.push(observable(value));
      return fn();
    } catch (err) {
      throw err;
    } finally {
      this.stack.pop();
    }
  }

  /** @internal */
  get current(): T {
    return this.stack[this.stack.length - 1];
  }
}

export function use<
  T extends Context<any>,
  V extends T extends Context<infer P> ? P : never,
>(context: T): V {
  return context.current;
}
