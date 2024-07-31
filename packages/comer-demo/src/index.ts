import { Fragment, Ref } from 'comer';
import { div, Footer, Header, Main, renderer, Span, Video } from 'comer-dom';

const span = new Span();
console.log('span', span);

renderer.render(div({
  children: [
    new Header(),
    new Main({
      ref: new Ref<Main>(),
      innerText: 'Hello word',
      onClick: (event: MouseEvent) => {
        console.log('click', event.target);
      },
      children: new Video()
    }),
    new Fragment(),
    new Footer(),
  ]
}), document.getElementById('root')!);

console.log('renderer', renderer);