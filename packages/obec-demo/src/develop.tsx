/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { render } from "obec";

export function List({ children }: any) {
  return (
    <ul>
      <li>1</li>
      <li>2</li>
      <li>{children || "NONE"}</li>
    </ul>
  );
}

export function App() {
  const message = "哈哈";
  return (
    <div onclick={() => alert(0)}>
      <List>
        {message}
        <List />
      </List>
      <div>
        {["aaa", "bbb"].map((it) =>
          it.split("").map((char) => <div>{char}</div>)
        )}
      </div>
    </div>
  );
}

render(<App />, document.getElementById("root"));