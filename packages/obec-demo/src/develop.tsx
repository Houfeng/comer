/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { render } from "obec";

export function List({ count }: { count: number }) {
  return (
    <div style={{ wordBreak: "break-all" }}>
      {new Array(count).fill("").map((_it, index) => (
        <span>{index}</span>
      ))}
    </div>
  );
}

export function App() {
  const btn = (<button>点这儿</button>) as HTMLButtonElement;
  btn.onclick = () => alert(0);
  return (
    <div
      className="box"
      style={{
        background: "#eee",
        color: "#222",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      {btn}
      <List count={1000} />
    </div>
  );
}

console.time("render");
render(<App />, document.getElementById("root"));
console.timeEnd("render");