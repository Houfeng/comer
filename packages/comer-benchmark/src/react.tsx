import * as React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (<div>React demo</div>)
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);