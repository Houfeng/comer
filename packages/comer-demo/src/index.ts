import { Div, renderer, Span } from 'comer-dom';

const span = new Span();
console.log('span', span);

renderer.render(new Div({
  children: [
    new Span({
      innerText: 'Hello word',
      onClick: (event: MouseEvent) => {
        console.log('click', event.target);
      }
    }),
  ]
}), document.getElementById('root'));

console.log('renderer', renderer);