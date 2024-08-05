export interface Flag<T> {
  run<H extends () => any>(value: T, handler: H): ReturnType<H>;
  current(): T;
}

export function Flag<T>(initialValue: T): Flag<T> {
  const stack: T[] = [initialValue];
  function run<H extends () => any>(value: T, handler: H): ReturnType<H> {
    stack.push(value);
    try {
      return handler();
    } finally {
      stack.pop();
    }
  }
  function current(): T {
    return stack[stack.length - 1];
  }
  return { run, current };
}
