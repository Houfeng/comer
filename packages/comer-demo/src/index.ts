import { Component, Fragment, Ref } from 'comer';
import { Div, Footer, Header, Main, renderer, Video } from 'comer-dom';

class App extends Component {
  mainRef = new Ref<Main>();
  build(): Component {
    return new Div({
      children: [
        new Header(),
        new Main({
          ref: this.mainRef,
          innerText: 'Hello word',
          onClick: (event: MouseEvent) => {
            console.log('click', event.target);
          },
          children: new Video()
        }),
        new Fragment(),
        new Footer(),
      ]
    });
  }
}

renderer.render(new App(), document.getElementById('root')!);

console.log('renderer', renderer);