/**
 * Copyright (c) 2022-present Houfeng
 * @homepage https://github.com/Houfeng/obec
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { render } from 'comer';

export function List({ count }: { count: number }) {
  return (
    <div style={{ wordBreak: 'break-all' }}>
      {new Array(count).fill('').map((_it, index) => (
        <span
          style={{
            margin: '4px',
            padding: '4px',
            background: '#faa',
            display: 'inline-block',
          }}
        >
          {index}
        </span>
      ))}
    </div>
  );
}

export function App() {
  const x = { count: 2000 };
  return (
    <div
      className="box"
      style={{
        background: '#eee',
        color: '#222',
        padding: '20px',
        borderRadius: '8px',
      }}
    >
      <List {...x} count={100} />
    </div>
  );
}

console.time('render');
render(<App />, document.getElementById('root'));
console.timeEnd('render');
