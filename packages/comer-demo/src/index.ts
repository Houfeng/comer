import { Fragment, Ref } from 'comer';
import { Div, Footer, Header, Main, renderer, Video } from 'comer-dom';

const mainRef = new Ref<Main>();
console.log('mainRef', mainRef);

renderer.render(new Div({
  children: [
    new Header(),
    new Main({
      ref: mainRef,
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