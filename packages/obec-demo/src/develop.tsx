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
    <div className="box" onclick={() => alert(0)} style={{
      background: "#eee",
      color: "#222",
      padding: "20px",
      borderRadius: "8px"
    }}>
      <List>
        {message}
        <List />
      </List>
      <div>
        {new Array(5000).fill("").map((_it, index) => (
          <div>{index}</div>
        ))}
      </div> 
    </div>
  );
}

console.time("render");
render(<App />, document.getElementById("root"));
console.timeEnd("render");