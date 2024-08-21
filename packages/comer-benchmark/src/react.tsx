import React, { ChangeEvent, useState } from 'react';
import { createRoot } from 'react-dom/client';

function Item(props: { text: string }) {
  return <span>{props.text}</span>
}

function List() {
  const [num, setNum] = useState(100);
  const [value, setValue] = useState(1);
  const updateNum = (event: ChangeEvent<HTMLInputElement>) => {
    setNum(Number(event.target.value))
  }
  const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value))
  }
  return (
    <div>
      <input value={num} onChange={updateNum} />
      <input value={value} onChange={updateValue} />
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
        {new Array(num).fill(' ')
          .map((_, i) => <Item text={`${i}:${value}`} />)}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<List />);