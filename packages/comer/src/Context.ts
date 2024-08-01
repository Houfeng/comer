import { observable } from "ober";
import { Component } from "./Component";

export class Context<T = unknown> {
  private state: { value: T | null };
  constructor(initialValue: T) {
    this.state = observable({ value: initialValue ?? null });
  }
  get value(): T | null {
    return this.state.value;
  }
}

export class Provider<
  T extends Context,
  V extends T extends Context<infer IV> ? IV : unknown,
> extends Component<{
  context: T;
  value: V | null;
  children: Component[] | Component;
}> {
  get value() {
    return this.props.value;
  }
}
