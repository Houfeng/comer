import { Ref } from 'comer';
import { Div, Footer, Header, Main, renderer, Span, Video } from 'comer-dom';
const span = new Span();
console.log('span', span);
renderer.render(new Div({
    children: [
        new Header(),
        new Main({
            ref: new Ref(),
            innerText: 'Hello word',
            onClick: (event) => {
                console.log('click', event.target);
            },
            children: [new Video()]
        }),
        new Footer(),
    ]
}), document.getElementById('root'));
console.log('renderer', renderer);
//# sourceMappingURL=index.js.map