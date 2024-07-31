import { Component } from "./Component";
import { Context } from "./Context";

export class Provider<
  T extends Context<object>,
  V extends T extends Context<infer IV> ? IV : object,
> extends Component<{
  context: T;
  value: V;
  children: Component[];
}> {}

const ThemeContext = new Context({ color: "red" });

export const p = new Provider({
  context: ThemeContext,
  value: { color: "" },
  children: [],
});
